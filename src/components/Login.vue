<template>
    <div class="login">
        <h3>Login</h3>
        
            <form @submit.prevent="formSubmit" method="post">
                
                    <div>
                        <label for="email"></label>
                        <input id="email" type="text" placeholder="email" v-model="email"><br>
                    </div>
                
                
                    <div>
                        <label for="password"></label>
                        <input id="password" type="password" placeholder="password" v-model="password"><br>
                    </div>
        
    
        <button type="submit">로그인</button>
        <p>만약 계정이 없다면, <router-link to="/signup">회원가입</router-link>을 먼저 진행해주세요!</p>
            </form>
        
    </div>

</template>
  
  <script>
  
    export default {
      // eslint-disable-next-line vue/multi-word-component-names
      name: 'login',
      data() {
        return {
            email:'',
            password:'',
        }
      },
      methods: {
        async formSubmit() {
            // const userData = {
            //     email: this.email,
            //     password: this.password,
            // };

            // const response = await loginUser(userData)
            // if (response.status == 200){
            //     alert('환영합니다.');
            //     this.$router.replace('/');
            // }else{
            //     alert(response.data);
            // }
            this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(response => {
            if (response.status == 200) {
              alert('환영합니다.');
              this.$router.push({
                name: "MyPage",
              })
            }
          })
          .catch(({ message }) => alert(message))

        return true   
    
    }
    }}
  </script>
  
  <style scoped>
    .login {
      margin-top: 40px;
    }
    input {
      margin: 10px 0;
      width: 20%;
      padding: 15px;
    }
    button {
      margin-top: 20px;
      width: 10%;
      cursor: pointer;
    }
    p {
      margin-top: 40px;
      font-size: 15px;
    }
    p a {
      text-decoration: underline;
      cursor: pointer;
    }
  </style>