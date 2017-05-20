//
//  FSCalendarScopeViewController.swift
//  FSCalendarSwiftExample
//
//  Created by dingwenchao on 30/12/2016.
//  Copyright © 2016 wenchao. All rights reserved.
//

import UIKit


import FSCalendar
class FSCalendarScopeExampleViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, FSCalendarDataSource, FSCalendarDelegate, UIGestureRecognizerDelegate {
    
//    @IBOutlet weak var showLab: UILabel!
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var calendar: FSCalendar!
    @IBOutlet weak var animationSwitch: UISwitch!
    
    @IBOutlet weak var calendarHeightConstraint: NSLayoutConstraint!
    
    fileprivate lazy var dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy/MM/dd"
        return formatter
    }()
    fileprivate lazy var scopeGesture: UIPanGestureRecognizer = {
        [unowned self] in
        let panGesture = UIPanGestureRecognizer(target: self.calendar, action: #selector(self.calendar.handleScopeGesture(_:)))
        panGesture.delegate = self
        panGesture.minimumNumberOfTouches = 1
        panGesture.maximumNumberOfTouches = 2
        return panGesture
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if UIDevice.current.model.hasPrefix("iPad") {
            self.calendarHeightConstraint.constant = 400
        }
        self.calendar.allowsMultipleSelection = true
        
        self.calendar.select(Date())
        
        self.view.addGestureRecognizer(self.scopeGesture)
        self.tableView.panGestureRecognizer.require(toFail: self.scopeGesture)
        self.calendar.scope = .week
        
        // For UITest
        self.calendar.accessibilityIdentifier = "calendar"
        
    }
    
    deinit {
        print("\(#function)")
    }
    //public var selectDay;
    
    // MARK:- UIGestureRecognizerDelegate
    
    func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        let shouldBegin = self.tableView.contentOffset.y <= -self.tableView.contentInset.top
        if shouldBegin {
            let velocity = self.scopeGesture.velocity(in: self.view)
            switch self.calendar.scope {
            case .month:
                return velocity.y < 0
            case .week:
                return velocity.y > 0
            }
        }
        return shouldBegin
    }
    
    func calendar(_ calendar: FSCalendar, boundingRectWillChange bounds: CGRect, animated: Bool) {
        self.calendarHeightConstraint.constant = bounds.height
        self.view.layoutIfNeeded()
    }
    
    var selectedDates :Array<String> = [""];
    func calendar(_ calendar: FSCalendar, didSelect date: Date, at monthPosition: FSCalendarMonthPosition) {
        print("did select date \(self.dateFormatter.string(from: date))")
        selectedDates = calendar.selectedDates.map({self.dateFormatter.string(from: $0)})
        print("selected dates is \(selectedDates)")
//        [tableView, reloadData];
        tableView.reloadData();

        //selectDay.append
        calendarHeightConstraint.accessibilityLabel=self.dateFormatter.string(from: date);
        
        if monthPosition == .next || monthPosition == .previous {
            calendar.setCurrentPage(date, animated: true)
        }
    }
    
    func calendar(_ calendar: FSCalendar, didDeselect date: Date,at monthPosition: FSCalendarMonthPosition) {
        print("did deselect date \(self.dateFormatter.string(from: date))")
        selectedDates = calendar.selectedDates.map({self.dateFormatter.string(from: $0)})
        print("selected dates is \(selectedDates)")
        tableView.reloadData();
//        self.configureVisibleCells()
    }

    func calendarCurrentPageDidChange(_ calendar: FSCalendar) {
        print("\(self.dateFormatter.string(from: calendar.currentPage))")
    }
    
    
    
    
    
    // MARK:- UITableViewDataSource
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return [3,20][section]
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.section == 0 {
            let identifier = ["cell_month", "cell_week", "cell_time"][indexPath.row]
            let cell = tableView.dequeueReusableCell(withIdentifier: identifier)!
            return cell
        } else {
            let cell = tableView.dequeueReusableCell(withIdentifier: "cell")!

            if(selectedDates.count > indexPath.row){
                cell.textLabel?.text="第"+"\(indexPath.row+1)"+"天:"+"\(selectedDates[indexPath.row])";
            }else{
                cell.textLabel?.text="";
            }
            
//            cell.detailTextLabel?.text="1234"
            return cell
        }
    }
    
    
    // MARK:- UITableViewDelegate
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if indexPath.section == 0 {
            
            if(indexPath.row == 0 || indexPath.row == 1){
                let scope: FSCalendarScope = (indexPath.row == 0) ? .month : .week
                self.calendar.setScope(scope, animated: self.animationSwitch.isOn)
            }else{
                
                
//                let alert2 = UIAlertController(title: "选择默认可用时间段", message: nil, preferredStyle: .actionSheet)
//                let ok = UIAlertAction(title: "OK", style: .cancel, handler: nil)
//                alert2.addAction(ok)
//                self.present(alert2, animated: true, completion: nil)
                
//            
//                let alertController:UIAlertController=UIAlertController(title: "\n\n\n\n\n\n\n\n\n\n\n\n", message: nil, preferredStyle: UIAlertControllerStyle.actionSheet)
                // 初始化 datePicker
                let datePicker = UIDatePicker( )
                //将日期选择器区域设置为中文，则选择器日期显示为中文
                datePicker.locale = NSLocale(localeIdentifier: "zh_CN") as Locale
                // 设置样式，当前设为同时显示日期和时间
                datePicker.datePickerMode = UIDatePickerMode.date
                // 设置默认时间
                datePicker.date = NSDate() as Date
                // 响应事件（只要滚轮变化就会触发）
                // datePicker.addTarget(self, action:Selector("datePickerValueChange:"), forControlEvents: UIControlEvents.ValueChanged)
//                alert2.addAction(UIAlertAction(title: "确定", style: UIAlertActionStyle.default,handler:nil)）,,;
//                alert2.addAction(UIAlertAction(title: "确定", style: UIAlertActionStyle.default){
//                    (alertAction)->Void in
//                    print("date select: \(datePicker.date.description)")
//                    //获取上一节中自定义的按钮外观DateButton类，设置DateButton类属性thedate
//              
//                    
////                                    let myDateButton=self.Datebutt as? DateButton
//                    //                myDateButton?.thedate=datePicker.date
//                    //                //强制刷新
//                    //                myDateButton?.setNeedsDisplay()
//                })
//                alert2.addAction(UIAlertAction(title: "取消", style: UIAlertActionStyle.cancel,handler:nil))
                
//                alert2.view.addSubview(datePicker)
                
//                self.present(alert2, animated: true, completion: nil)
            }
            
            
        }
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 10
    }
    
    // MARK:- Target actions
    
    @IBAction func toggleClicked(sender: AnyObject) {
        if self.calendar.scope == .month {
            self.calendar.setScope(.week, animated: self.animationSwitch.isOn)
        } else if self.calendar.scope == .week {
            self.calendar.setScope(.month, animated: self.animationSwitch.isOn)
//        } else if self.calendar.scope == .time {
        } else {
         
        }
    }
    
}
