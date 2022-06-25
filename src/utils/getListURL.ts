import type { UrlData } from '../types/UrlData'

export function getListURL(_listUrlData: UrlData[]) : string {
  let stringifyURLs: string = "";
  _listUrlData.forEach(function(value: UrlData, index: number) {
    let url = value.url;
    stringifyURLs = stringifyURLs + `${index+1}. ${url}\n`
  })
  return stringifyURLs;
}