
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

    const getMergedTime = (start, end) =>{
        let startHour = Math.floor(start / 60)
        let startMin = Math.floor(start % 60)

        let endHour = Math.floor(end / 60)
        let endMin = Math.floor(end % 60)


        if(startHour < 10){ startHour = '0'+startHour}
        if(startMin < 10){ startMin = '0'+startMin}
        if(endHour < 10){ endHour = '0'+endHour}
        if(endMin < 10){ endMin = '0'+endMin}

        return startHour + '.'+ startMin + ' - ' + endHour + '.'+ endMin
    }

    inject('getDayName', getDayName)
    inject('getMergedTime', getMergedTime)
    context.$getDayName = getDayName
    context.$getMergedTime = getMergedTime
}