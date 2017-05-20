//
//  DefaultTimerVC.swift
//  FSCalendarSwiftExample
//
//  Created by 朱恩庆 on 2017/5/20.
//  Copyright © 2017年 wenchao. All rights reserved.
//

import UIKit

class DefaultTimerVC: UITableViewController {

    
//    var theme: Int = 0
//    var lunar: Bool = false
//    var firstWeekday: UInt = 1
//    var scrollDirection: FSCalendarScrollDirection = .horizontal
//    var selectedDate: Date?
    
    @IBOutlet weak var datePicker: UIDatePicker!
    @IBOutlet weak var startTime: UIDatePicker!
    @IBOutlet weak var endTime: UIDatePicker!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

//    override func numberOfSections(in tableView: UITableView) -> Int {
//        // #warning Incomplete implementation, return the number of sections
//        return 0
//    }
//
//    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//        // #warning Incomplete implementation, return the number of rows
//        return 0
//    }

    /*
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)

        // Configure the cell...

        return cell
    }
    */

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = super.tableView(tableView, cellForRowAt: indexPath)
        switch indexPath.section {
//        case 0:
//            cell.accessoryType = self.theme == indexPath.row ? .checkmark : .none;
//        case 1:
//            cell.accessoryType = self.lunar ? .checkmark : .none;
//        case 2:
//            cell.accessoryType = indexPath.row == 1 - Int(self.scrollDirection.rawValue) ? .checkmark : .none;
//        case 4:
//            cell.accessoryType = indexPath.row == Int(self.firstWeekday-1) ? .checkmark : .none;
        default:
            break
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        switch indexPath.section {
//        case 0:
//            self.theme = indexPath.row
//        case 1:
//            self.lunar = !self.lunar
//        case 2:
//            self.scrollDirection = FSCalendarScrollDirection(rawValue: UInt(1-indexPath.row))!
//        case 3:
//            self.selectedDate = self.datePicker.date;
//        case 4:
//            self.firstWeekday = UInt(indexPath.row + 1)
        default:
            break
        }
        tableView.reloadSections([indexPath.section] as IndexSet, with: .none)
        DispatchQueue.main.asyncAfter(deadline: DispatchTime.now()+0.2) {
            self.performSegue(withIdentifier: "unwind2InterfaceBuilder", sender: self)
        }
        
    }


}
