//
//  UserHistoryVC2.swift
//  FSCalendarSwiftExample
//
//  Created by 朱恩庆 on 2017/5/28.
//  Copyright © 2017年 wenchao. All rights reserved.
//

import UIKit

class UserHistoryVC2: UIView,UIPickerViewDataSource,UIPickerViewDelegate {
    var scorelist = ["0~59","60~74","75~89","90~99"]
    var scoreresonlist = ["申请学校要求","父母意见","老师意见","自己感觉"]

    
    
    // returns the number of 'columns' to display.
    @available(iOS 2.0, *)
    func numberOfComponents(in pickerView: UIPickerView) -> Int{
        return 1
    }
    
    
    // returns the # of rows in each component..
    @available(iOS 2.0, *)
    public func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int{
  
        let indentifier=pickerView.restorationIdentifier
        if indentifier == "scoreReason"{
            return scoreresonlist.count
        }else{
            return scorelist.count
        }
        
    }

    // these methods return either a plain NSString, a NSAttributedString, or a view (e.g UILabel) to display the row for the component.
    // for the view versions, we cache any hidden and thus unused views and pass them back for reuse.
    // If you return back a different object, the old one will be released. the view will be centered in the row rect
    @available(iOS 2.0, *)
    public func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String?{
        let indentifier=pickerView.restorationIdentifier
        if indentifier == "scoreReason"{
            return scoreresonlist[row]
        }else{
            return scorelist[row]
        }
        
        
    }
    
    //    @available(iOS 6.0, *)
    //    public func pickerView(_ pickerView: UIPickerView, attributedTitleForRow row: Int, forComponent component: Int) -> NSAttributedString?{
    //    // attributed title is favored if both methods are implemented
    //
    //    }
    
    //    @available(iOS 2.0, *)
    //    public func pickerView(_ pickerView: UIPickerView, viewForRow row: Int, forComponent component: Int, reusing view: UIView?) -> UIView{
    //
    //    }
    //
    
    @available(iOS 2.0, *)
    public func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int){
        print(row)
        
    }

    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */

}
