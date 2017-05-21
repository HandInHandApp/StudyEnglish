//
//  TimeClass.swift
//  FSCalendarSwiftExample
//
//  Created by 朱恩庆 on 2017/5/21.
//  Copyright © 2017年 wenchao. All rights reserved.
//

import UIKit
import SwiftDate

//class TimeClass: NSObject {
class TimeClass: NSObject {
    
    // 定义属性
    // 存储属性
    var year : Int = 0
    var month : Int = 0
    
    var day : Int = 0
    var week : Int = 0
    var Hour :Int = 0
    var Min :Int = 0
    var Second :Int = 0
    
//    override init()
//    {//不带参数
//        year = 2017;
//        month = 5;
//    }
    
//    init( y:Int, m:Int, d:Int, h:Int, m:Int, s:Int)    {//带参数
    init( date:Date)    {//带参数

        year = date.year;
        month = date.month;
        day=date.day;
        Hour=date.hour;
        Min=date.minute;
        Second=date.second;
    }
    
    /**
     时间转化为时间戳
     
     
     :param: stringTime 时间为stirng
     
     :returns: 返回时间戳为stirng
     */
     func stringToTimeStamp(stringTime:String)->String {
        
        var dfmatter = DateFormatter()
        dfmatter.dateFormat="yyyy年MM月dd日"
        var date = dfmatter.date(from: stringTime)
        
        var dateStamp:TimeInterval = date!.timeIntervalSince1970
        
        var dateSt:Int = Int(dateStamp)
        print(dateSt)
        return String(dateSt)
        
    }
    
    /**
     时间戳转时间
     
     
     :param: timeStamp <#timeStamp description#>
     
     :returns: return time
     */
    func timeStampToString(timeStamp:String)->String {
        
        var string = NSString(string: timeStamp)
        
        var timeSta:TimeInterval = string.doubleValue
        var dfmatter = DateFormatter()
        dfmatter.dateFormat="yyyy年MM月dd日"
        
        var date = NSDate(timeIntervalSince1970: timeSta)
        
        print(dfmatter.string(from: date as Date))
        return dfmatter.string(from: date as Date)
    }
    
    


}
