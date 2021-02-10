export const state = () => ({
    paylasimList: null,
})

export const mutations = {
    setPaylasimList(state, paylasimList) {
        state.paylasimList = paylasimList
    },

    setLike(state,paylasim){
        console.log("mutatations tetiklendi")
        console.log(paylasim.id)
       console.log(state.getPaylasimList)

    }

   
}

export const actions = {

    fetchPaylasimList(vueContext, options) {
        console.log(options);
        const url = 'paylasim/getAllWithSponsor2/'+options.bolumID+'/'+options.page;
        console.log(url)
        return this.$axios.post(url,{soruTipi : options.soruTipi, dersID : options.dersID, konuID: options.konuID, kimler: options.kimler}).then(response => {
            console.log("liste geldi")
            vueContext.commit('setPaylasimList', response.data)
        }).catch(err => {
            console.log("error")
            console.log(err)
        })
    },

    setLike(vueContext,paylasim){
        console.log("setLike tetiklendi")
        console.log(paylasim)
        vueContext.commit('setLike', paylasim)
    }

    
}




export const getters = {
    getPaylasimList(state) {
        return state.paylasimList
    },
    
}