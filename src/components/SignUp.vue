<template>
    <div class="sign-up">   
    <form @submit.prevent="submitForm" method="post">    
        <p>회원가입</p>
        
        <div>
            <label for="email"></label>
            <input id="email" type="text" placeholder="email" v-model="email" ><br>
        </div>
        
        
        <div>
            <label for="password"></label>
            <input id="password" type="password" placeholder="password" v-model="password"><br>
        </div>
        
        
        <div>
            <label for="nickname"></label> 
            <input id="nickname" type="text" placeholder="nickname" v-model="nickname"><br>
        </div>
        
        <button type="submit">가입하기</button>
        <span>또는 <router-link to="/login"> 로그인</router-link>으로 돌아가기</span>
    </form>
    
    </div>
    
</template>
<script>
  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: '',
        nickname: '',
      };
    },
    methods: {
       async submitForm() {
            // const userData = {
            //     email: this.email,
            //     password: this.password,
            //     nickname: this.nickname,
            // };

            // const response = await registerUser(userData)
            // if (response.status == 200){
            //     alert('환영합니다.');
            //     this.$router.push('login');
            // }else{
            //     alert(response.data);
            // }
            this.$store
          .dispatch("join", {
            email: this.email,
            password: this.password,
            nickname: this.nickname,
          })
          .then(response => {
            if (response.status == 200) {
              alert('가입완료!.');
              this.$router.push({
                name: "Login",
              })
            }
          })
          .catch(({ message }) => alert(message))

        return true
        }
    }
  }
</script>

<style scoped>
  .signUp {
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
    font-size: 20px;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 15px;
  }
</style>