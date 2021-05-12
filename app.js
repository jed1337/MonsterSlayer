function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner:null
        }
    },
    computed: {
        monsterHealthBar() {
            return { width: this.monsterHealth + '%' }
        },
        playerHealthBar() {
            return { width: this.playerHealth + '%' }
        },
        isSpecialAttackAvailable() {
            return this.currentRound % 3 !== 0
        }
    },
    watch:{
        monsterHealth(value){
            if(value<0 && this.playerHealth<0){
                this.winner='draw'
            } else if(this.playerHealth<0){
                this.winner='monster'
            }
        },
        playerHealth(value){
            if(value<0 && this.monsterHealth<0){
                this.winner='draw'
            } else if(this.monsterHealth<0){
                this.winner='player'
            }
        },
    },
    methods: {
        attackMonster() {
            this.currentRound++

            const damage = getRandomValue(5, 12)
            this.monsterHealth -= damage
            this.attackPlayer()
        },
        specialAttackMonster() {
            this.currentRound++

            const damage = getRandomValue(10, 25)
            this.monsterHealth -= damage
            this.attackPlayer()
        },
        attackPlayer() {
            const damage = getRandomValue(8, 18)
            this.playerHealth -= damage
        },
        healPlayer(){
            this.currentRound++
            const value = getRandomValue(8, 20)
            this.playerHealth+=value
            if(this.playerHealth>100){
                this.playerHealth=100
            }
            this.attackPlayer()
        }
    }
})

app.mount("#game")