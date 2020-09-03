export default function (creation_date:number):string {
    const date = new Date(creation_date * 1000)
    const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const datevalues = [
        date.getDate(),
        month_names_short[date.getMonth()],
        date.getFullYear()
    ];
    return datevalues.join(" ")
}