import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
export default function({store}){

    const socketConnection = SocketIO('/server/');

    Vue.use(new VueSocketIO({
        debug: false,
        connection: socketConnection,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
    }))
    
    

}

