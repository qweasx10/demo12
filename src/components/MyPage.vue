<template>
    <div>
        <h1>JWT 마이페이지 화면</h1>
        <button @click="logout()">Logout</button>
        <!-- <a href="javascript:;" @click="getList">GET방식접근</a> -->
        <div><v-data-table
          v-model="selected"
          :headers="headers"
          :items="this.account"
          show-select
          ><v-checkbox label="Checkbox"></v-checkbox></v-data-table><v-card class="mt-2 pa-2">
    
  </v-card></div>
        
    </div>
    
      
    
    
</template>
<script>
    
    import {mapGetters} from "vuex"

    export default{
        name: "MyPage",
        components: {},
        computed: {
            ...mapGetters(["isAuthenticated"])
        },
        mounted() {
          this.getList();
          
        },
        data(){
          return {
            selected: [],
            headers:[
              {text:'ID',value: 'id'},
              {text:'상태',value:'state'},
              {text:'출발지',value:'departures'},
              {text:'도착지',value:'arrivals'},
              {text:'차량번호',value:'carnumber'},
            ],
            account:[
              {id:'',
              state:'',
              departures:'',
              arrivals:'',
              carnumber:'',
          }
          ]
          };
        },
        
        methods: {
          getList(){
            this.$axios.get("http://localhost:8082/api/home/get").then((res)=>{
              console.log(res);
              this.account = res.data;
              console.log(this.account);
             
              
            }).then((err)=>{
              console.log(err);
            })

          },
          // createAccountInfoList(){
          //   for(var i =0; i< this.account.length; i++){
          //     this.item.id = this.account[i].id;
              
          //     this.items.push(this.item);
          //     console.log(this.items);
          //     this.item={};
          //   }
            
          // },
          
            redirect() {
        console.log("redirect")
        console.log("isAuthenticated : " + this.isAuthenticated)
        if (!this.isAuthenticated) {
          this.$router.push({
            name: "Login",
          })
        }
      },
      logout() {
        this.$store
          .dispatch("logout", {})
          .then(() => this.redirect())
          .catch(err => {
    // Ignore the vuex err regarding  navigating to the page they are already on.
    if (
      err.name !== 'NavigationDuplicated' &&
      !err.message.includes('Avoided redundant navigation to current location')
    ) {
      // But print any other errors to the console
      // eslint-disable-next-line no-undef
      logError(err);
    }
  })
      },
        },
    }
</script>