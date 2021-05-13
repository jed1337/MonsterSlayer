function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            log:[],
        }
    },
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerHealthBar() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },
        isSpecialAttackAvailable() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        monsterHealth(value) {
            if (value < 0 && this.playerHealth < 0) {
                this.winner = 'draw'
            } else if (this.playerHealth < 0) {
                this.winner = 'monster'
            }
        },
        playerHealth(value) {
            if (value < 0 && this.monsterHealth < 0) {
                this.winner = 'draw'
            } else if (this.monsterHealth < 0) {
                this.winner = 'player'
            }
        },
    },
    methods: {
        restart() {
            this.monsterHealth = 100
            this.playerHealth = 100
            this.currentRound = 0
            this.winner = null
        },
        surrender(){
            this.winner='monster'
        },
        attackMonster() {
            this.currentRound++

            const damage = getRandomValue(5, 12)
            this.monsterHealth -= damage

            this.addLog('player', 'attack', damage)
            
            this.attackPlayer()
        },
        specialAttackMonster() {
            this.currentRound++
            
            const damage = getRandomValue(10, 25)
            this.monsterHealth -= damage
            this.addLog('player', 'special attack', damage)
            
            this.attackPlayer()
        },
        attackPlayer() {
            const damage = getRandomValue(8, 18)
            this.playerHealth -= damage
            this.addLog('monster', 'attack', damage)
        },
        healPlayer() {
            this.currentRound++
            const value = getRandomValue(8, 20)
            this.playerHealth += value

            this.addLog('player', 'heal', value)

            if (this.playerHealth > 100) {
                this.playerHealth = 100
            }
            this.attackPlayer()
        },
        addLog(who, what, value){
            this.log.unshift({who, what, value})
        },
    }
})

app.mount("#game")