<template>
  <q-page
    class="pagina-register"
    style="
      background-color: #181f36;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <q-row class="q-pa-xl" justify="center">
      <q-col cols="12" sm="10" md="8" lg="6" xl="6">
        <q-card
          class="card-register shadow-3"
          style="max-width: 600px; margin: auto"
        >
          <q-card-section>
            <div class="text-h5" style="color: #ffffff; font-weight: bold">
              Registro
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="nome"
              label="Nome"
              :error="!nameValid"
              :error-message="nameError"
              @blur="validateName"
              outlined
              dense
              clearable
              class="q-mb-md"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              v-model="email"
              label="Email"
              :error="!emailValid"
              :error-message="emailError"
              @blur="validateEmail"
              outlined
              dense
              clearable
              class="q-mb-md"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="senha"
              label="Senha"
              type="password"
              :error="!passwordValid"
              :error-message="passwordError"
              @blur="validatePassword"
              outlined
              dense
              clearable
              class="q-mb-md"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <q-input
              v-model="confirmPassword"
              label="Confirmar Senha"
              type="password"
              :error="!confirmPasswordValid"
              :error-message="confirmPasswordError"
              @blur="validateConfirmPassword"
              outlined
              dense
              clearable
              class="q-mb-md"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              :disable="!formValid"
              label="Registrar"
              icon="person_add"
              @click="handleRegister"
              color="accent"
              class="botao-register"
              style="
                border-radius: 8px;
                padding: 10px 20px;
                font-weight: bold;
                transition: all 0.3s ease;
              "
              @mouseover="hoverRegisterButton = true"
              @mouseleave="hoverRegisterButton = false"
            />
          </q-card-actions>

          <q-card-section align="center">
            <q-btn
              flat
              @click="goToLogin"
              label="Já tem uma conta? Faça Login"
              class="link-register"
              color="secondary"
              style="margin-top: 10px; font-weight: 500"
            />
          </q-card-section>
        </q-card>
      </q-col>
    </q-row>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { register } from "src/services/authService";

export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const nome = ref("");
    const email = ref("");
    const senha = ref("");
    const confirmPassword = ref("");
    const nameValid = ref(true);
    const emailValid = ref(true);
    const passwordValid = ref(true);
    const confirmPasswordValid = ref(true);
    const nameError = ref("");
    const emailError = ref("");
    const passwordError = ref("");
    const confirmPasswordError = ref("");

    const formValid = computed(() => {
      return (
        nameValid.value &&
        emailValid.value &&
        passwordValid.value &&
        confirmPasswordValid.value &&
        nome.value !== "" &&
        email.value !== "" &&
        senha.value !== "" &&
        confirmPassword.value !== ""
      );
    });

    const validateName = () => {
      if (nome.value.length < 3) {
        nameValid.value = false;
        nameError.value = "O nome deve ter pelo menos 3 caracteres";
      } else {
        nameValid.value = true;
        nameError.value = "";
      }
    };

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        emailValid.value = false;
        emailError.value = "Por favor, insira um email válido";
      } else {
        emailValid.value = true;
        emailError.value = "";
      }
    };

    const validatePassword = () => {
      if (senha.value.length < 6) {
        passwordValid.value = false;
        passwordError.value = "A senha deve ter pelo menos 6 caracteres";
      } else {
        passwordValid.value = true;
        passwordError.value = "";
      }
    };

    const validateConfirmPassword = () => {
      if (confirmPassword.value !== senha.value) {
        confirmPasswordValid.value = false;
        confirmPasswordError.value = "As senhas não coincidem";
      } else {
        confirmPasswordValid.value = true;
        confirmPasswordError.value = "";
      }
    };

    const handleRegister = async () => {
      if (formValid.value) {
        try {
          await register({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
          });

          $q.notify({
            message: "Registro realizado com sucesso!",
            type: "positive",
          });

          router.push("/login");
        } catch (error) {
          $q.notify({
            message:
              error.response?.data?.message || "Erro ao realizar registro",
            type: "negative",
          });
        }
      }
    };

    const goToLogin = () => {
      router.push("/login");
    };

    return {
      nome,
      email,
      senha,
      confirmPassword,
      nameValid,
      emailValid,
      passwordValid,
      confirmPasswordValid,
      nameError,
      emailError,
      passwordError,
      confirmPasswordError,
      formValid,
      validateName,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
      handleRegister,
      goToLogin,
    };
  },
};
</script>

<style>
.pagina-register {
  background: #181f36;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-register {
  border-radius: 12px;
  padding: 40px;
  background-color: #2e3b55;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.botao-register {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.botao-register:hover {
  background-color: #1e88e5;
  color: white;
}

.link-register {
  color: #007bff;
  cursor: pointer;
}

.link-register:hover {
  text-decoration: underline;
}
</style>
