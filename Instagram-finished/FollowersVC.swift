//
//  FollowersVC.swift
//  Instagram
//
//  Created by 朱恩庆 on 2017/5/13.
//  Copyright © 2017年 刘铭. All rights reserved.
//

import UIKit
import AVOSCloud

class FollowersVC: UITableViewController {
    
    var show = String()
    var user = String()
    
    var followerArray = [AVUser]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationItem.title = show
        
        if show == "关 注 者" {
            loadFollowers()
        }else {
            loadFollowings()
        }
        
    }
    
    func loadFollowers() {
        AVUser.current().getFollowers { (followers:[Any]?, error:Error?) in
            if error == nil && followers != nil {
                self.followerArray = followers! as! [AVUser]
                self.tableView.reloadData()
            }else {
                print(error?.localizedDescription)
            }
        }
        
    }
    
    func loadFollowings() {
        AVUser.current().getFollowees { (followings:[Any]?, error:Error?) in
            if error == nil && followings != nil {
                self.followerArray = followings! as! [AVUser]
                self.tableView.reloadData()
            }else {
                print(error?.localizedDescription)
            }
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return followerArray.count
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        // 通过indexPath获取用户所点击的单元格的用户对象
        // let cell = tableView.cellForRow(at: indexPath) as! FollowersCell
        
        
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath) as! FollowersCell
        
        cell.usernameLbl.text = followerArray[indexPath.row].username
        let ava = followerArray[indexPath.row].object(forKey: "ava")
        (ava as AnyObject).getDataInBackground({ (data:Data?, error:Error?) in
            if error == nil {
                cell.avaImg.image = UIImage(data: data!)
            }else {
                print(error?.localizedDescription)
            }
        })
        
        // 利用按钮外观区分当前用户关注或未关注状态
        let query = followerArray[indexPath.row].followeeQuery()
        query?.whereKey("user", equalTo: AVUser.current())
        query?.whereKey("followee", equalTo: followerArray[indexPath.row])
        query?.countObjectsInBackground({ (count:Int, error:Error?) in
            if error == nil {
                if count == 0 {
                    cell.followBtn.setTitle("关 注", for: .normal)
                    //cell.followBtn.backgroundColor = .lightGray()
                }else {
                    cell.followBtn.setTitle("√ 已关注", for: .normal)
                    //cell.followBtn.backgroundColor = .green()
                }
            }
        })
        
        //cell.userObjectId = followerArray[indexPath.row].objectId
        cell.user = followerArray[indexPath.row] 
        
        // 为当前用户隐藏关注按钮
        if cell.usernameLbl.text == AVUser.current().username {
            cell.followBtn.isHidden = true
        }
        
        return cell
    }
}
