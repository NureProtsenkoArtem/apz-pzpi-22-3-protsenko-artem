import { createBrowserRouter } from "react-router-dom"
import { ROUTES } from "./routes.enums"
import { Home } from "@pages/Home/homePage"
import { RegistrationPage } from "@pages/RegistrationPage/registrationPage"
import { LoginPage } from "@pages/LoginPage/loginPage"
import { UserPage } from "@pages/UserPage/userPage"
import { CreatePetPage } from "@pages/CreatePetPage/createPetPage"
import { PetListPage } from "@pages/PetListPage/pet-list.page"
import { PetPage } from "@pages/PetPage/pet-page.page"
import { UpdatePetPage } from "@pages/UpdatePetPage/update-pet.page"
import { AddMealPage } from "@pages/AddMealPage/add-meal.page"
import { UpdateMealPage } from "@pages/UpdateMealPage/update-meal.page"
import { DbAdminPage } from "@pages/DbAdminPage/db-admin.page"
import { SystemAdminPage } from "@pages/SystemAdminPage/system-admin.page"
import { VerificationPage } from "@pages/VerificationPage/verification.page"
import { LocalAdminPage } from "@pages/LocalAdminPage/local-admin.page"
import { HealthAnalysisListPage } from "@pages/HealthAnalysisListPage/health-analysis-list.page"

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Home />
    },
    {
        path: ROUTES.REGISTRATION_PAGE,
        element: <RegistrationPage />
    },
    {
        path: ROUTES.LOGIN_PAGE,
        element: <LoginPage />
    },
    {
        path: ROUTES.USER_PROFILE,
        element: <UserPage />
    },
    {
        path: ROUTES.CREATE_PET_PAGE,
        element: <CreatePetPage />
    },
    {
        path: ROUTES.PET_LIST_PAGE,
        element: <PetListPage />
    },
    {
        path: ROUTES.PET_PAGE,
        element: <PetPage />
    },
    {
        path: ROUTES.UPDATE_PET_PAGE,
        element: <UpdatePetPage />
    },
    {
        path: ROUTES.ADD_MEAL,
        element: <AddMealPage />
    },
    {
        path: ROUTES.EDIT_MEAL,
        element: <UpdateMealPage />
    },
    {
        path: ROUTES.DB_ADMIN_PAGE,
        element: <DbAdminPage />
    },
    {
        path: ROUTES.SYSTEM_ADMIN_PAGE,
        element: <SystemAdminPage />
    },
    {
        path: ROUTES.VERIFICATION_PAGE,
        element: <VerificationPage />
    },
    {
        path: ROUTES.LOCAL_ADMIN_PAGE,
        element: <LocalAdminPage />
    },
    {
        path: ROUTES.HEALTH_ANALYSIS_LIST_PAGE,
        element: <HealthAnalysisListPage />
    },


])

export default router