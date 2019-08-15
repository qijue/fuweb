
function getRandName(type) {
  type = type || 1;
  let cstr1 =
    "赵,钱,孙,李,周,吴,郑,王,冯,陈," +
    "褚,卫,蒋,沈,韩,杨,朱,秦,尤,许," +
    "何,吕,施,张,孔,曹,严,华,金,魏," +
    "陶,姜,戚,谢,邹,喻,柏,水,窦,章," +
    "云,苏,潘,葛,奚,范,彭,郎,鲁,韦," +
    "昌,马,苗,凤,花,方,俞,任,袁,柳," +
    "酆,鲍,史,唐,费,廉,岑,薛,雷,贺," +
    "倪,汤,滕,殷,罗,毕,郝,邬,安,常," +
    "乐,于,时,傅,皮,卞,齐,康,伍,余," +
    "元,卜,顾,孟,平,黄,和,穆,萧,尹";
  let familyNames = cstr1.split(',');
  let cstr3 =
    "司马,诸葛,呼延,欧阳,太史,端木,上官," +
    "东方,南宫,尉迟,宇文,长孙,司徒,令狐," +
    "公孙,慕容,百里,东郭,达奚,拓跋,申屠";
  let comFamilyNames = cstr3.split(',');
  let cstr2 = "子璇,淼,国栋,夫子,瑞堂,甜,敏,尚,国贤,贺祥,晨涛," +
    "昊轩,易轩,益辰,益帆,益冉,瑾春,瑾昆,春齐,杨,文昊," +
    "东东,雄霖,浩晨,熙涵,溶溶,冰枫,欣欣,宜豪,欣慧,建政," +
    "美欣,淑慧,文轩,文杰,欣源,忠林,榕润,欣汝,慧嘉,新建," +
    "建林,亦菲,林,冰洁,佳欣,涵涵,禹辰,淳美,泽惠,伟洋," +
    "涵越,润丽,翔,淑华,晶莹,凌晶,苒溪,雨涵,嘉怡,佳毅," +
    "子辰,佳琪,紫轩,瑞辰,昕蕊,萌,明远,欣宜,泽远,欣怡," +
    "佳怡,佳惠,晨茜,晨璐,运昊,汝鑫,淑君,晶滢,润莎,榕汕," +
    "佳钰,佳玉,晓庆,一鸣,语晨,添池,添昊,雨泽,雅晗,雅涵," +
    "清妍,诗悦,嘉乐,晨涵,天赫,玥傲,佳昊,天昊,萌萌,若萌";
  let givenNames = cstr2.split(',');
  if (type != 1) familyNames = comFamilyNames;
  let i = Math.floor(familyNames.length * Math.random());
  let familyName = familyNames[i];

  let j = Math.floor(givenNames.length * Math.random());
  let givenName = givenNames[j];
  return familyName + givenName;
}


function getRandBankCard(bank_no = '0102') {
  var prefix = "";
  switch (bank_no) {
    case "0102":
      prefix = "622202";  // 工商银行
      break;
    case "0103":
      prefix = "622848";  // 农业银行
      break;
    case "0105":
      prefix = "622700";  // 中国建设银行
      break;
    case "0301":
      prefix = "622262";  // 中国交通银行借记卡
      break;
    case "104":
      prefix = "621661";  // 中国银行借记卡
      break;
    case "0303":
      prefix = "622666";  // 光大银行借记卡
      break;
    case "305":
      prefix = "622622";  // 中国民生银行
      break;
    case "0306":
      prefix = "622556";  // 广发银行
      break;
    case "0308":
      prefix = "622588";  // 中国招商银行借记卡
      break;
    case "0410":
      prefix = "622155";  // 平安股份有限公司银行贷记卡
      break;
    case "302":
      prefix = "622689";  // 中信银行
      break;
    case "304":
      prefix = "622630";  // 华夏银行借记卡
      break;
    case "309":
      prefix = "622908";  // 兴业银行
      break;
    case "310":
      prefix = "621717";  // ??
      break;
    case "315":
      prefix = "622323";  // 常熟农村商业银行
      break;
    case "316":
      prefix = "622309";  // 中国工商银行借记卡
      break;
    default:
  }
  var num = 13;
  if (['0410'].indexOf(bank_no) != -1) {
    num = 10
  }
  for (var j = 0; j < num; j++) {
    prefix = prefix + Math.floor(Math.random() * 10);
  }
  return prefix;
}


function getRandMobile() {
  let prefixArray = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
  let i = parseInt(10 * Math.random());
  let prefix = prefixArray[i];
  for (let j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10);
  }
  return prefix;
}

export {
  getRandName,
  getRandBankCard,
  getRandMobile
}
