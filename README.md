# Storabble – Cypress Login Test Suite

This repository contains a Cypress-based automated and manual test suite for verifying the login functionality of the [Storabble](https://st.storabble.etondigital.com/en/login) web application.

## 📌 Project Overview

**Tester:** Viktor

**Test Period:** 02.06.2025 – 09.06.2025  
**App URL:** https://st.storabble.etondigital.com/en/login  
**Auth Credentials:**  
- Username: `storabble`  
- Password: `ed2023`

## ✅ Objective

Ensure the login functionality behaves as expected across different input scenarios. Tests focus on:
- Valid & invalid login attempts
- UI/UX validation (empty fields, masking)
- Basic security (brute force simulation, multiple sessions)
- Cypress automation for core cases

## 🔬 Scope of Testing

- Input validation and feedback  
- Error message accuracy  
- Redirects on success/failure  
- Multiple browser/device support  
- Automation using Cypress (partial)

## 🧪 Testing Types

- Manual Functional Testing  
- UI/UX Testing  
- Basic Security Testing  
- Cypress Automation (10 test cases)

## 🛠️ Test Environment

- **Browsers:** Brave (main), Firefox, Edge  
- **OS:** Windows 10, Android 15  
- **Devices:** PC, Samsung S22  
- **Tools:** Cypress, DevTools, Snipping Tool, Google Docs  
- **Environment URL:** https://explorer.blockcontrol.xyz/

## 📄 Test Cases (Summary)

| TC ID | Title                        | Priority | Status  |
|-------|------------------------------|----------|---------|
| TC01  | Valid login                  | High     | ✅ Pass |
| TC02  | Invalid password             | High     | ⚠️ Needs Fix |
| TC03  | Invalid email format         | Medium   | ✅ Pass |
| TC04  | Empty fields                 | High     | ✅ Pass |
| TC05  | Empty password               | High     | ✅ Pass |
| TC06  | Empty email                  | High     | ✅ Pass |
| TC07  | Password masked              | Medium   | ✅ Pass |
| TC08  | Password unmasked            | Medium   | ✅ Pass |
| TC09  | Logging out                  | Low      | ❌ Fail |
| TC10  | Brute-force behavior #1      | Low      | ✅ Pass |
| TC11  | Brute-force behavior #2      | Low      | ✅ Pass |
| TC12  | Double session login         | Medium   | ✅ Pass |
| TC13  | Triple session login         | Medium   | ✅ Pass |
| TC14  | Forgot password via email    | High     | ⚠️ Needs Fix |

## 🚧 Known Issues

- **TC02:** Incorrect error message for valid email + wrong password  
- **TC09:** Logout requires multiple clicks  
- **TC14:** Password reset emails land in spam

## 🔄 Recommendations

- Refactor error message logic  
- Improve logout functionality  
- Fix email deliverability (SPF, DKIM, DMARC)

## 🤖 Cypress Automation Coverage

Automated test cases:
TC01,TC02.TC03, TC04,TC05, TC06, TC07, TC08, TC09 and TC10


## 📬 Contact

**Author:** Viktor Kokeza  
📧 Email: viktor.kokeza@gmail.com



