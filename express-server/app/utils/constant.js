const Constant = {
    secret: "this is token", //私钥
    pwd: "this is password",
    format(date){
        let year = date.getFullYear(),
            month = this.add(date.getMonth() + 1),
            day = this.add(date.getDate()),
            hh = this.add(date.getHours()),
            mm = this.add(date.getMinutes()),
            ss = this.add(date.getSeconds());
        return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
    },
    add(num){
        return num < 10 ? '0' + num : num;
    },
    test(){
        
    }
}

export default Constant