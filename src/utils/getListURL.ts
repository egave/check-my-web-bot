import { CHECK_TYPE } from '../config'
import type { UrlData } from '../types/UrlData'

export function getListURL(_listUrlData: UrlData[]) : string {
  let stringifyURLs: string = "";
  _listUrlData.forEach(function(value: UrlData, index: number) {
    let url = value.url;
    let checkType = value.check_type;
    if ((checkType === CHECK_TYPE[0]) || (checkType === CHECK_TYPE[1]))
      stringifyURLs = stringifyURLs + `${index+1}. ${checkType} - ${url}\n`
    else {
      let sentence = value.sentence;
      stringifyURLs = stringifyURLs + `${index+1}. ${checkType} ('${sentence}') - ${url}\n`
    }
  })
  return stringifyURLs;
}