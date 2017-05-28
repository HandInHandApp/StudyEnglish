//
//  UserHistoryVC.swift
//  
//
//  Created by 朱恩庆 on 2017/5/28.
//
//

import UIKit

class UserHistoryVC: UIViewController,UIPickerViewDataSource,UIPickerViewDelegate{

    
    @IBOutlet weak var pickerView: UIPickerView!
    var colors = ["Red","Yellow","Green","Blue"]
    
    
    // returns the number of 'columns' to display.
    @available(iOS 2.0, *)
     func numberOfComponents(in pickerView: UIPickerView) -> Int{
     return 1
    }
    
    
    // returns the # of rows in each component..
    @available(iOS 2.0, *)
    public func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int{
        return colors.count
    }
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        pickerView = UIPickerView()
        //将dataSource设置成自己
        pickerView.dataSource = self
        //将delegate设置成自己
        pickerView.delegate = self
        //设置选择框的默认值
        pickerView.selectRow(1,inComponent:0,animated:true)
        pickerView.selectRow(2,inComponent:1,animated:true)
        pickerView.selectRow(3,inComponent:2,animated:true)
        self.view.addSubview(pickerView)
        
//        //建立一个按钮，触摸按钮时获得选择框被选择的索引
//        let button = UIButton(frame:CGRect(x:0, y:0, width:100, height:30))
//        button.center = self.view.center
//        button.backgroundColor = UIColor.blue
//        button.setTitle("获取信息",for:.normal)
//        button.addTarget(self, action:#selector(UIViewController.getPickerViewValue),
//                         for: .touchUpInside)
//        self.view.addSubview(button)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // these methods return either a plain NSString, a NSAttributedString, or a view (e.g UILabel) to display the row for the component.
    // for the view versions, we cache any hidden and thus unused views and pass them back for reuse.
    // If you return back a different object, the old one will be released. the view will be centered in the row rect
    @available(iOS 2.0, *)
    public func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String?{
        
        return  colors[row]
    
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
    
    
//    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
//        return 1
//    }
//    
//    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int)->Int {
//        return colors.count
//    }
//    
//    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String! {
//        return colors[row]
//    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
