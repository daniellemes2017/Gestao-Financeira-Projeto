<template>
  <q-page
    class="pagina-login"
    style="
      background-color: #181f36;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <q-row class="q-pa-md" justify="center">
      <q-col cols="12" sm="10" md="8" lg="6" xl="5">
        <q-card class="card-login shadow-3">
          <q-card-section>
            <div class="text-h5" style="font-weight: bold; color: #ffffff">
              Login
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="email"
              label="Email"
              :error="emailError"
              :error-message="emailErrorMessage"
              outlined
              dense
              clearable
              class="q-mb-md"
              autofocus
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              v-model="password"
              label="Senha"
              type="password"
              :error="passwordError"
              :error-message="passwordErrorMessage"
              outlined
              dense
              clearable
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-checkbox
              v-model="rememberMe"
              label="Lembre-se de mim"
              color="primary"
            />
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              :loading="isLoading"
              label="Entrar"
              icon="login"
              @click="handleLogin"
              color="accent"
              class="botao-login"
              style="
                border-radius: 8px;
                padding: 10px 20px;
                font-weight: bold;
                transition: all 0.3s ease;
              "
              @mouseover="hoverLoginButton = true"
              @mouseleave="hoverLoginButton = false"
            />
          </q-card-actions>

          <q-card-section align="center">
            <q-btn
              flat
              @click="goToRegister"
              label="Não tem uma conta? Registre-se"
              class="link-register"
              color="secondary"
              style="margin-top: 10px; font-weight: 500; color: #ffffff"
            />
          </q-card-section>
        </q-card>
      </q-col>
    </q-row>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { login } from "src/services/authService";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const isLoading = ref(false);
    const emailError = ref(false);
    const emailErrorMessage = ref("");
    const passwordError = ref(false);
    const passwordErrorMessage = ref("");
    const hoverLoginButton = ref(false);
    const $q = useQuasar();

    onMounted(() => {
      email.value = "";
    });

    const validateEmail = (email) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    };

    const handleLogin = async () => {
      emailError.value = false;
      passwordError.value = false;
      emailErrorMessage.value = "";
      passwordErrorMessage.value = "";

      if (!email.value) {
        emailError.value = true;
        emailErrorMessage.value = "O email é obrigatório";
        return;
      }
      if (!validateEmail(email.value)) {
        emailError.value = true;
        emailErrorMessage.value = "Por favor, insira um email válido";
        return;
      }
      if (!password.value) {
        passwordError.value = true;
        passwordErrorMessage.value = "A senha é obrigatória";
        return;
      }

      isLoading.value = true;
      try {
        await login(email.value, password.value);

      if (rememberMe.value) {
        localStorage.setItem("email", email.value);
      } else {

        localStorage.removeItem("email");
      }

        $q.notify({
          message: "Login realizado com sucesso!",
          type: "positive",
        });

        await router.push("/dashboard");
      } catch (error) {
        $q.notify({
          message: error.message || "Erro ao tentar fazer login",
          type: "negative",
        });
      } finally {
        isLoading.value = false;
      }
    };

    const goToRegister = () => {
      router.push("/register");
    };

    return {
      email,
      password,
      rememberMe,
      isLoading,
      emailError,
      emailErrorMessage,
      passwordError,
      passwordErrorMessage,
      handleLogin,
      goToRegister,
      hoverLoginButton,
    };
  },
};
</script>

<style>
.pagina-login {
  background-color: #181f36;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-login {
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #2e3b55;
  color: #ffffff;
  text-align: center;
}

.botao-login {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.botao-login:hover {
  background-color: #1e88e5;
  color: white;
}

.link-register {
  color: #ffffff;
  cursor: pointer;
}

.link-register:hover {
  text-decoration: underline;
}
</style>
