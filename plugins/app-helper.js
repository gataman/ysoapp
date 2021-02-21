
export default (context, inject) => {


    const getDayName = (day) => {
        switch (day) {
            case 1:
                return "Pazartesi";

            case 2:
                return "Salı";

            case 3:
                return "Çarşamba";

            case 4:
                return "Perşembe";

            case 5:
                return "Cuma";

            case 6:
                return "Cumartesi";

            case 7:
                return "Pazar";

            default:
                return "Pazartesi";
        }
    }

    const getMergedTime = (start, end) => {
        let startHour = Math.floor(start / 60)
        let startMin = Math.floor(start % 60)

        let endHour = Math.floor(end / 60)
        let endMin = Math.floor(end % 60)


        if (startHour < 10) { startHour = '0' + startHour }
        if (startMin < 10) { startMin = '0' + startMin }
        if (endHour < 10) { endHour = '0' + endHour }
        if (endMin < 10) { endMin = '0' + endMin }

        return startHour + '.' + startMin + ' - ' + endHour + '.' + endMin
    }

    const getGecenZaman = (time) => {
        const day = new Date();
        const secondMillis = 1000
        const minuteMillis = 60 * secondMillis
        const hourMillis = 60 * minuteMillis
        const dayMillis = 24 * hourMillis

        const now = day.getTime();

        if (time > now || time <= 0) {
            return null
        }

        const diff = now - time
        if (diff < minuteMillis) {
            return "1 dakika önce"
        } else if (diff < 2 * minuteMillis) {
            return "1 dakika önce"
        } else if (diff < 50 * minuteMillis) {
            return parseInt((diff / minuteMillis)).toString() + " dakika önce"
        } else if (diff < 90 * minuteMillis) {
            return "1 saat önce"
        } else if (diff < 24 * hourMillis) {
            return parseInt((diff / hourMillis)).toString() + " saat önce"
        } else {
            return parseInt((diff / dayMillis)).toString() + " gün önce"
        }
    }

    inject('getDayName', getDayName)
    inject('getMergedTime', getMergedTime)
    inject('getGecenZaman', getGecenZaman)

    context.$getDayName = getDayName
    context.$getMergedTime = getMergedTime
    context.$getGecenZaman = getGecenZaman
}