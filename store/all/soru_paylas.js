export const state = () => ({
    paylasimList: [],
})

export const mutations = {
    setPaylasimList(state, paylasimList) {
        state.paylasimList = paylasimList
    },

    setInfiniteList(state, data) {

        if (data.list.length > 0) {
            data.list.forEach((item) => state.paylasimList.push(item));
            data.state.loaded();
        } else {
            data.state.complete();
        }



    },

    paylasimBegen(state, paylasim) {
        console.log(paylasim) 

        /*

        this.socket.on("paylasimBegen", (paylasim) => {
      console.log("cevap geldi");
      console.log(paylasim);
      if (paylasim) {
        const pay = this.paylasimList.find(
          (item) => item.id === paylasim.paylasimID
        );
        if (pay) {
          if (paylasim.isLike) {
            pay.begeniSayisi--;
          } else {
            pay.begeniSayisi++;
          }

          if (this.userID == paylasim.begenenID) {
            pay.isLike = !paylasim.isLike;
          }
        }
      }
    });
        */
    }


}

export const actions = {

    fetchPaylasimList(vueContext, data) {


        return this.$axios.post(data.url, data.options).then(response => {
            vueContext.commit('setPaylasimList', response.data)
        }).catch(err => {
            console.log("error")
            console.log(err)
        })

    },

    fetchInfiniteList(vueContext, data) {
        return this.$axios.post(data.url, data.options).then(response => {

            vueContext.commit('setInfiniteList', { list: response.data, state: data.state })
        }).catch(err => {
            console.log("error")
            console.log(err)
        })
    },

    paylasimBegen(vueContext, paylasim) {
        console.log("setLike tetiklendi")
        console.log(paylasim)
        vueContext.commit('setLike', paylasim)
    }


}




export const getters = {
    paylasimList(state) {
        return state.paylasimList
    },

}