//
//  selectVC.swift
//  Instagram
//
//  Created by 朱恩庆 on 2017/5/8.
//


import UIKit
import AVOSCloud


class selectVC: UIViewController {
    
    @IBOutlet weak var selectLab: UILabel!
//
//    @IBOutlet weak var selectLab: UILabel!
//    @IBOutlet weak var studentBut: UIButton!
    
//    @IBOutlet weak var parentsBut: UIButton!
    
    
//    @IBOutlet weak var teacherBut: UIButton!
    
//    @IBOutlet weak var cancelBtn: UIButton!
    
//    @IBOutlet weak var cancelBtn: UIButton!
    


    
//
//    @IBOutlet weak var selectLab: UILabel!
//    @IBOutlet weak var studentBut: UIButton!
//
//    @IBOutlet weak var parentBut: UIButton!
//    
//    @IBOutlet weak var teacherBut: UIButton!
//    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // label的字体设置
        selectLab.font = UIFont(name: "Pacifico", size: 25)
//
//        selectLab.frame = CGRect(x: 10, y: 80, width: self.view.frame.width - 20, height: 50)
//        
//        studentBut.frame = CGRect(x: 20, y: selectLab.frame.origin.y + 70, width: self.view.frame.width - 40, height: 30)
//        parentsBut.frame = CGRect(x: 20, y: studentBut.frame.origin.y + 40, width: self.view.frame.width - 40, height: 30)
//        
//        teacherBut.frame = CGRect(x: 20, y: parentsBut.frame.origin.y + 40, width: self.view.frame.width - 40, height: 30)
//
//        
//        cancelBtn.frame = CGRect(x: 20 ,
//                                 y: teacherBut.frame.origin.y + 50,
//                                 width: self.view.frame.width - 40,
//                                 height: 30)
//        
        let hideTap = UITapGestureRecognizer(target: self, action: #selector(hideKeyboard))
        hideTap.numberOfTapsRequired = 1
        self.view.isUserInteractionEnabled = true
        self.view.addGestureRecognizer(hideTap)
    
        
        //设置背景图
        let bg = UIImageView(frame: CGRect(x: 0, y: 0, width: self.view.frame.width, height: self.view.frame.height))
        
        bg.image = UIImage(named: "bg.jpg")
        bg.layer.zPosition = -1
        self.view.addSubview(bg)
        
    }
    
    func hideKeyboard(recognizer: UITapGestureRecognizer) {
        self.view.endEditing(true)
    }
    

    @IBAction func cancelBtn_click(_ sender: AnyObject) {
        
        self.view.endEditing(true)
        self.dismiss(animated: true, completion: nil)
    }
}
