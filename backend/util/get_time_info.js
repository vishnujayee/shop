const getmonth_from_month_number = (num) => {
    switch (num) {
        case 1:
            return "january";
        case 2 :
            return "febuary";
            case 3 :
                return "march";
                case 4 :
                return "april";
                case 5 :
                return "may";
                case 6 :
                return "june";
                case 7 :
                return "july";
                case 8 :
                return "august";
                case 9 :
                return "sep";
                case 10 :
                return "october";
                case 11 :
                return "november";
                case 12 :
                return "december";
        default:
            break;
    }
}
module.exports = {
    getmonth_from_month_number :getmonth_from_month_number,
}