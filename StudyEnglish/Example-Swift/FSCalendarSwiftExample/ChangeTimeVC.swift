//
//  ChangeTimeVC.swift
//  FSCalendarSwiftExample
//
//  Created by 朱恩庆 on 2017/5/21.
//  Copyright © 2017年 wenchao. All rights reserved.
//

import UIKit

class ChangeTimeVC: UITableViewController {

    
    @IBOutlet weak var startTime: UIDatePicker!
    @IBOutlet weak var endTime: UIDatePicker!

    override func viewDidLoad() {
//        startTime.date = selectedStartDates[curchangetimeIndex] ;
//        endTime.date = selectedEndDates[curchangetimeIndex] ;
        
        super.viewDidLoad()
        var x = endTime.timeZone;
        var y = startTime.timeZone;
        endTime.timeZone = startTime.timeZone;
    
        

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


    
    //日期选择器响应方法
    @IBAction func DefaultStartTimeChange(_ sender: AnyObject) {
        //更新提醒时间文本框
        let formatter = DateFormatter()
        //日期样式
        formatter.dateFormat = "HH:mm:ss"
//        st = startTime.date;
        var tmp=startTime.date;
        print(formatter.string(from: startTime.date))
        selectedStartDates[curchangetimeIndex] = startTime.date;
        print(formatter.string(from: selectedStartDates[curchangetimeIndex]))
        
        // 2、post notification and send value
        print("发送通知")
        let notificationName = Notification.Name(rawValue: "DownloadImageNotification")
        NotificationCenter.default.post(name: notificationName, object: self,
                                        userInfo: ["value1":"hangge.com", "value2" : 12345])
        print("通知完毕")
        
        
    }
    
    @IBAction func DefaultEndTimeChange(_ sender: AnyObject) {
        //更新提醒时间文本框
        let formatter = DateFormatter()
        //日期样式
        formatter.dateFormat = "HH:mm:ss"
//        et = endTime.date;
        var tmp=endTime.date;
        selectedEndDates[curchangetimeIndex] = endTime.date;

        print(formatter.string(from: endTime.date))
        
        // 2、post notification and send value
        print("发送通知")
        let notificationName = Notification.Name(rawValue: "DownloadImageNotification")
        NotificationCenter.default.post(name: notificationName, object: self,
                                        userInfo: ["value1":"hangge.com", "value2" : 12345])
        print("通知完毕")
        
    }
    
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = super.tableView(tableView, cellForRowAt: indexPath)
        switch indexPath.section {
//                    case 0:
//                        startTime.date = selectedStartDates[curchangetimeIndex] ;
//                    case 1:
//                        endTime.date = selectedEndDates[curchangetimeIndex] ;
            //        case 2:
            //            cell.accessoryType = indexPath.row == 1 - Int(self.scrollDirection.rawValue) ? .checkmark : .none;
            //        case 4:
        //            cell.accessoryType = indexPath.row == Int(self.firstWeekday-1) ? .checkmark : .none;
        default:
            break
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        switch indexPath.section {
            //        case 0:
            //            self.theme = indexPath.row
            //        case 1:
            //            self.lunar = !self.lunar
            //        case 2:
            //            self.scrollDirection = FSCalendarScrollDirection(rawValue: UInt(1-indexPath.row))!
            //        case 3:
            //            self.selectedDate = self.datePicker.date;
            //        case 4:
        //            self.firstWeekday = UInt(indexPath.row + 1)
        default:
            break
        }
        tableView.reloadSections([indexPath.section] as IndexSet, with: .none)
        DispatchQueue.main.asyncAfter(deadline: DispatchTime.now()+0.2) {
            self.performSegue(withIdentifier: "unwind2InterfaceBuilder", sender: self)
        }
        
    }
    
    


}
