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

    setBegeni(state, data) {
        console.log("mutations setBegeni");
        console.log(data);

        const paylasim = data.paylasim
        if (paylasim) {
            const pay = state.paylasimList.find(
                (item) => item.id === paylasim.paylasimID
            );
            if (pay) {
                if (paylasim.isLike) {
                    pay.begeniSayisi--;
                } else {
                    pay.begeniSayisi++;
                }

                if (data.userID == paylasim.begenenID) {
                    pay.isLike = !paylasim.isLike;
                }
            }
        }
    },


    setSelfBegeni(state, paylasim) {
        let pay = state.paylasimList.find((item) => item.id === paylasim.paylasimID);
        if (paylasim.isLike) {
            pay.begeniSayisi--;
        } else {
            pay.begeniSayisi++;
        }
        pay.isLike = !pay.isLike;
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
    }
}




export const getters = {
    paylasimList(state) {
        return state.paylasimList
    },

}