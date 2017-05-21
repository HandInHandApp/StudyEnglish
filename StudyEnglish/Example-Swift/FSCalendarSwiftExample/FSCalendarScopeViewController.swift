//
//  FSCalendarScopeViewController.swift
//  FSCalendarSwiftExample
//
//  Created by dingwenchao on 30/12/2016.
//  Copyright © 2016 wenchao. All rights reserved.
//

import UIKit


import FSCalendar

import SwiftDate



public var st = Date();
public var et = Date();
public var curchangetimeIndex = 0;

public var selectedDatesStr :Array<String> = []
public var selectedStartDates :Array<Date> = [];
public var selectedEndDates :Array<Date> = [];

class FSCalendarScopeExampleViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, FSCalendarDataSource, FSCalendarDelegate, UIGestureRecognizerDelegate {
    
//    @IBOutlet weak var showLab: UILabel!
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var calendar: FSCalendar!
    @IBOutlet weak var animationSwitch: UISwitch!
    
    @IBOutlet weak var calendarHeightConstraint: NSLayoutConstraint!
    
    
    selectedStartDates?{
        willSet{
            //变量将要被设置值
            }
        didSet{
            //变量的值已经改变
        }
    }
    
    fileprivate lazy var dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy/MM/dd"
        return formatter
    }()
    
    fileprivate lazy var timeFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm:ss"
        return formatter
    }()
    
    fileprivate lazy var datetimeFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = " yyyy/MM/dd HH:mm:ss"
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
        
//        self.calendar.select(Date())
        
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
    
    func setNewStartTime(orginDate : Date) ->Date {
    
        let calendarNew = Calendar.current
        let dateComponents = calendarNew.dateComponents([.year,.month, .day], from: orginDate )
        let stComponents = calendarNew.dateComponents([.hour,.minute,.second], from: st )
        
        print("dateComponents: \(dateComponents.year)");
        var components = DateComponents()
        
        components.year = dateComponents.year
        components.month = dateComponents.month
        components.day = dateComponents.day
        
        components.hour = stComponents.hour
        components.minute = stComponents.minute
        components.second = stComponents.second
        
        components.timeZone = TimeZone(abbreviation: "UTC")
        
        var newStartDate = calendarNew.date(from: components)
        print("\(self.datetimeFormatter.string(from: newStartDate!))")

        
        return newStartDate!;
    }
    
    func setNewEndTime(orginDate : Date) ->Date {
        
        let calendarNew = Calendar.current
        let dateComponents = calendarNew.dateComponents([.year,.month, .day], from: orginDate )
        let stComponents = calendarNew.dateComponents([.hour,.minute,.second], from: et )
        
        print("dateComponents: \(dateComponents.year)");
        var components = DateComponents()
        
        components.year = dateComponents.year
        components.month = dateComponents.month
        components.day = dateComponents.day
        
        components.hour = stComponents.hour
        components.minute = stComponents.minute
        components.second = stComponents.second
        
        components.timeZone = TimeZone(abbreviation: "UTC")
        //        components.timeZone = TimeZone(abbreviation: "GMT")
        
        var newEndDate = calendarNew.date(from: components)
        print("\(self.datetimeFormatter.string(from: newEndDate!))")
        
        
        return newEndDate!;
    }
    
    

    
    func  updateSelect(_ calendar: FSCalendar)  {
        var selected :Array<String> = [];
        var sd :Array<Date> = [];
        var ed :Array<Date> = [];
        
        for (index,item) in calendar.selectedDates.enumerated() {
            
            sd.append(self.setNewStartTime(orginDate: item));
            ed.append(self.setNewEndTime(orginDate: item));
            let tmp="\(self.dateFormatter.string(from: item))"
                + "    from: " + "\(self.timeFormatter.string(from: st))"
                + "    to:   " + "\(self.timeFormatter.string(from: et))";
            
            selected.append(tmp)
        };
        selectedDatesStr = selected;
        selectedStartDates = sd;
        selectedEndDates = ed;
        
        print("selected dates is \(selectedDatesStr)")
        
        tableView.reloadData();
    }
    
    func  updateAddSelect(_ calendar: FSCalendar,date: Date)  {

        selectedStartDates.append(self.setNewStartTime(orginDate: date));
        selectedEndDates.append(self.setNewEndTime(orginDate: date));
        let tmp="\(self.dateFormatter.string(from: date))"
                + "    from: " + "\(self.timeFormatter.string(from: st))"
                + "    to:   " + "\(self.timeFormatter.string(from: et))";
            
        selectedDatesStr.append(tmp)
        
        print("selected dates is \(selectedDatesStr)")
        
        tableView.reloadData();
    }

    func  updateRemoveSelect(_ calendar: FSCalendar,date: Date)  {
        
        for (index,item) in calendar.selectedDates.enumerated() {
            
            if(item  == date){
                selectedStartDates.remove(at: index);
                selectedEndDates.remove(at: index);
                selectedDatesStr.remove(at: index);
            }
        
        };
        
        print("deselected dates is \(selectedDatesStr)")
        
        tableView.reloadData();
    }

    


    func calendar(_ calendar: FSCalendar, didSelect date: Date, at monthPositior3tn: FSCalendarMonthPosition) {
        print("did select date \(self.dateFormatter.string(from: date))")
        print("did select date \(self.timeFormatter.string(from: st))")
        print("did select date \(self.timeFormatter.string(from: et))")
        
        
//        updateAddSelect(calendar,date: date);
        updateSelect(calendar);
        //selectDay.append
        calendarHeightConstraint.accessibilityLabel=self.dateFormatter.string(from: date);
        
        if monthPositior3tn == .next || monthPositior3tn == .previous {
            calendar.setCurrentPage(date, animated: true)
        }
    }
    
    func calendar(_ calendar: FSCalendar, didDeselect date: Date,at monthPosition: FSCalendarMonthPosition) {
        print("did deselect date \(self.dateFormatter.string(from: date))")
//        selectedDates = calendar.selectedDates.map({self.dateFormatter.string(from: $0)})
//        print("deselected dates is \(selectedDates)")
        print("deselected dates is \(calendar.selectedDates)")
        
//        updateRemoveSelect(calendar,date: date);
        updateSelect(calendar);
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

            if(selectedDatesStr.count > indexPath.row){
                cell.textLabel?.text="第"+"\(indexPath.row+1)"+"天:"+"\(selectedDatesStr[indexPath.row])";
                cell.detailTextLabel?.text = "修改"
            }else{
                cell.textLabel?.text="";
                
            }
            
//            cell.bu
            
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
                
            }
        }
        if indexPath.section == 1 {
            print("change \(indexPath.row)")
            curchangetimeIndex = indexPath.row;
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
