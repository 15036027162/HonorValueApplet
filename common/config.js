let base_url = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // base_url = 'https://btapi.mlxcchina.com'
     base_url = 'http://10.1.1.251:10000'
}else{
    // 生产环境
	 base_url = 'https://open.mlxcchina.com'
	  // base_url = 'http://10.1.1.251:10000'
    // base_url = 'https://btapi.mlxcchina.com'
    // base_url = 'https://btapi.mlxcchina.com'
}

export default base_url