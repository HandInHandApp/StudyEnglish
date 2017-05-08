//
//  SignUpVC.swift
//  test0410
//
//  Created by cbuilder on 4/10/17.
//  Copyright © 2017 cbuilder. All rights reserved.
//

import UIKit
import AVOSCloud

class SignUpVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBOutlet weak var accountStr: UITextField!

    @IBOutlet weak var passwdStr: UITextField!
    
    @IBOutlet weak var phoneStr: UITextField!
    
    @IBOutlet weak var classStr: UITextField!
    
    
    @IBAction func regesterStart(_ sender: AnyObject) {
        
        print("\(accountStr)")
        print("\(passwdStr)")
        
        if(accountStr.text!.isEmpty || passwdStr.text!.isEmpty || phoneStr.text!.isEmpty){
            
            let alert = UIAlertController(title:"注册失败",message:"账号密码或者电话不能空",preferredStyle: .alert)
            let ok = UIAlertAction(title:"OK",style:.cancel,handler:nil);
            
            alert.addAction(ok);
            self.present(alert, animated: true, completion: nil)
            print("注册失败")
            
        }else{
            let testObject = AVObject(className:"register")
            
            
            testObject["account"]=accountStr.text;
            testObject["passwd"]=passwdStr.text;
            testObject["class"]=classStr.text;
            testObject["phone"]=phoneStr.text;
            
            testObject.save()
            
            let user = AVUser()
            user.username = accountStr.text;
            user.password = passwdStr.text;
            user.mobilePhoneNumber=phoneStr.text;
            
            var error: NSError?
            do {
                try user.signUp()
            } catch let error1 as NSError {
                error = error1
            }

        }

        
        
        
    }
  
    
 
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
