//
//  SignInVC.swift
//  test0410
//
//  Created by cbuilder on 4/10/17.
//  Copyright © 2017 cbuilder. All rights reserved.
//

import UIKit
import AVOSCloud
class SignInVC: UIViewController {

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let testObject = AVObject(className:"ActionRecod")
        testObject["Launch"]="ViewLogin"
        testObject.save()
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    @IBOutlet weak var account: UITextField!
    
    @IBOutlet weak var passwd: UITextField!
    
    
    @IBOutlet weak var forgetPasswdBut: UIButton!
    @IBOutlet weak var loginBut: UIButton!
    @IBOutlet weak var regesiterBut: UIButton!
    
    
    @IBAction func login(_ sender: Any) {
     
    }
    
    @IBAction func regesterChoice(_ sender: AnyObject) {
         print("regesterChoice")

        let alert = UIAlertController(title:"注册角色",message:"选择您的角色",preferredStyle: .alert)
        let teacher = UIAlertAction(title:"老师",style:.default,handler: {
                        (alert: UIAlertAction!) -> Void in
                        print("teacher registere")
                    });
        let student = UIAlertAction(title:"学生",style:.default,handler: {
                        (alert: UIAlertAction!) -> Void in
                        print("teacher registere")        });

        let famliy = UIAlertAction(title:"家长",style:.default,handler: {
                        (alert: UIAlertAction!) -> Void in
                        print("teacher registere")
        });

        alert.addAction(student);
        alert.addAction(teacher);
        alert.addAction(famliy);
        self.present(alert, animated: true, completion: nil)
    }
    
    
    @IBAction func login3(_ sender: Any) {
        print("start to login")
        print("\(account)")
        print("\(passwd)")

        
        var error : NSError?
        var user: AVUser!
        do {
            user = try AVUser.logIn(withUsername: account.text!, password: passwd.text!)
        } catch let error1 as NSError {
            error = error1
            user = nil
        }
        if(user != nil){
            print("登录成功, user:%@", user)
        }else{
            let alert = UIAlertController(title:"登陆失败",message:"账号密码错误",preferredStyle: .alert)
            let ok = UIAlertAction(title:"OK",style:.cancel,handler:nil);
            
     
            alert.addAction(ok);
            self.present(alert, animated: true, completion: nil)
            
            print("登录失败")
        }

    }
    @IBAction func login2(_ sender: Any) {
    
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
