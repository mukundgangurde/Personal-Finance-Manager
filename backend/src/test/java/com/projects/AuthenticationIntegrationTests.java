package com.projects;

import com.projects.repository.ExpenseRepository;
import com.projects.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthenticationIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Test
    void financeRoutesRequireAnAuthenticatedSession() throws Exception {
        mockMvc.perform(get("/api/dashboard/summary"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void registrationRequiresACsrfToken() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {"email":"csrf@example.test","password":"correct horse battery staple"}
                                """))
                .andExpect(status().isForbidden());
    }

    @Test
    @Rollback
    void registrationLoginAndFinanceDataAreScopedToTheAccount() throws Exception {
        AccountSession firstAccount = registerAndLogin("first@example.test");
        AccountSession secondAccount = registerAndLogin("second@example.test");

        mockMvc.perform(post("/api/expenses")
                        .session(firstAccount.session())
                        .cookie(firstAccount.csrfCookie())
                        .header("X-XSRF-TOKEN", firstAccount.csrfToken())
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                  "amount": 125.5,
                                  "category": "Food",
                                  "date": "2026-10-31",
                                  "description": "Test expense",
                                  "paymentMethod": "Card"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists());

        Long firstUserId = userRepository.findByEmail("first@example.test")
                .orElseThrow()
                .getId();
        Long expenseId = expenseRepository.findAllByUserId(firstUserId).get(0).getId();

        mockMvc.perform(get("/api/expenses").session(firstAccount.session()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));

        mockMvc.perform(get("/api/expenses").session(secondAccount.session()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        mockMvc.perform(get("/api/expenses/{id}", expenseId).session(secondAccount.session()))
                .andExpect(status().isNotFound());

        assertNotEquals(firstAccount.session().getId(), secondAccount.session().getId());
        assertTrue(userRepository.existsByEmail("first@example.test"));
        assertTrue(userRepository.existsByEmail("second@example.test"));
    }

    private AccountSession registerAndLogin(String email) throws Exception {
        MvcResult csrfResult = mockMvc.perform(get("/api/auth/csrf"))
                .andExpect(status().isNoContent())
                .andReturn();

        Cookie csrfCookie = csrfResult.getResponse().getCookie("XSRF-TOKEN");
        assertNotNull(csrfCookie);
        assertNotNull(csrfCookie.getValue());

        String csrfToken = csrfCookie.getValue();
        String requestBody = """
                {"email":"%s","password":"correct horse battery staple"}
                """.formatted(email);

        mockMvc.perform(post("/api/auth/register")
                        .cookie(csrfCookie)
                        .header("X-XSRF-TOKEN", csrfToken)
                        .contentType(APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated());

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .cookie(csrfCookie)
                        .header("X-XSRF-TOKEN", csrfToken)
                        .contentType(APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andReturn();

        MockHttpSession session = (MockHttpSession) loginResult.getRequest().getSession(false);
        assertNotNull(session);
        return new AccountSession(session, csrfCookie, csrfToken);
    }

    private record AccountSession(MockHttpSession session, Cookie csrfCookie, String csrfToken) {
    }
}
