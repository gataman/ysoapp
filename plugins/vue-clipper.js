import Vue from "vue";
import VueRx from "vue-rx";
// Use build files
import VuejsClipper from "vuejs-clipper/dist/vuejs-clipper.umd";
import "vuejs-clipper/dist/vuejs-clipper.css";

Vue.use(VueRx);
Vue.use(VuejsClipper, {
    components: {
        clipperBasic: true,
        clipperPreview: true,
        clipperFixed: true,
        clipperRange: true,
        clipperUpload:true
    }
})