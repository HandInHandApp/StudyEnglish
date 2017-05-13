//
//  HomeVC.swift
//  Instagram
//
//  Created by 朱恩庆 on 2017/5/11.
//  Copyright © 2017年 刘铭. All rights reserved.
//

import UIKit

private let reuseIdentifier = "Cell"

class HomeVC: UICollectionViewController {

//    @IBOutlet weak var myImg: UIImageView!
    
    @IBOutlet weak var myName: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Register cell classes
        self.collectionView!.register(UICollectionViewCell.self, forCellWithReuseIdentifier: reuseIdentifier)

        // Do any additional setup after loading the view.
        
        // label的字体设置
//        myName.font = UIFont(name: "Pacifico", size: 25)
//        
//        myName.frame = CGRect(x: 10, y: 80, width: self.view.frame.width - 20, height: 50)
        
//        studentBut.frame = CGRect(x: 20, y: selectLab.frame.origin.y + 70, width: self.view.frame.width - 40, height: 30)
//        parentsBut.frame = CGRect(x: 20, y: studentBut.frame.origin.y + 40, width: self.view.frame.width - 40, height: 30)
//        
//        teacherBut.frame = CGRect(x: 20, y: parentsBut.frame.origin.y + 40, width: self.view.frame.width - 40, height: 30)
//        
        
//        cancelBtn.frame = CGRect(x: 20 ,
//                                 y: teacherBut.frame.origin.y + 50,
//                                 width: self.view.frame.width - 40,
//                                 height: 30)
        
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
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    */

    // MARK: UICollectionViewDataSource

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 0
    }


    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of items
        return 0
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: reuseIdentifier, for: indexPath)
    
        // Configure the cell
    
        return cell
    }

    // MARK: UICollectionViewDelegate

    /*
    // Uncomment this method to specify if the specified item should be highlighted during tracking
    override func collectionView(_ collectionView: UICollectionView, shouldHighlightItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment this method to specify if the specified item should be selected
    override func collectionView(_ collectionView: UICollectionView, shouldSelectItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
    override func collectionView(_ collectionView: UICollectionView, shouldShowMenuForItemAt indexPath: IndexPath) -> Bool {
        return false
    }

    override func collectionView(_ collectionView: UICollectionView, canPerformAction action: Selector, forItemAt indexPath: IndexPath, withSender sender: Any?) -> Bool {
        return false
    }

    override func collectionView(_ collectionView: UICollectionView, performAction action: Selector, forItemAt indexPath: IndexPath, withSender sender: Any?) {
    
    }
    */

}
