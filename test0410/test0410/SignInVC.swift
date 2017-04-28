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
    
    
    @IBAction func login(_ sender: Any) {
        print("start to login")
        print("\(account)")
        print("\(passwd)")
    }
    
    @IBAction func login3(_ sender: Any) {
        print("start to login")
        print("\(account)")
        print("\(passwd)")
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
