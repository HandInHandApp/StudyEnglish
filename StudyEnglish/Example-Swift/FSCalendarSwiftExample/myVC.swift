//
//  myVC.swift
//  FSCalendarSwiftExample
//
//  Created by 朱恩庆 on 2017/6/3.
//  Copyright © 2017年 wenchao. All rights reserved.
//

import UIKit

import PNChart



class myVC:  UIViewController {

//    var ChartLabel:UILabel = UILabel(frame: CGRect(x: 0, y: 90, width: 320.0, height: 30))
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
//         lineChart()
        
        //For Circle Chart
        
        let circleChart=PNCircleChart(frame: CGRect(x: 250, y: 520, width: 520.0, height: 200),
                                      total: 100,
                                      current: 60,
                                      clockwise: true)
        
        let c = UIColor(colorLiteralRed: 77.0 / 255.0, green: 216.0 / 255.0, blue: 122.0 / 255.0, alpha: 1.0)
//        colorWithRed:77.0 / 255.0 green:216.0 / 255.0 blue:122.0 / 255.0 alpha:1.0f
        
        let a = PNPieChartDataItem(value: 10, color: c, description: "test")
        let b = PNPieChartDataItem(value: 20, color: c, description: "test1")
        let d = PNPieChartDataItem(value: 40, color: c, description: "test2")
        
      

        
//        let pieChart = PNPieChart(frame: CGRect(x: 400, y: 520, width: 520.0, height: 200),
//                                  items: [a,b,d])
//        
//        pieChart?.stroke()
        
        
        circleChart?.stroke()


        
        self.view.addSubview(circleChart!)
//        self.view.addSubview(pieChart!)
        

        
//        //设置背景图
//        let bg = UIImageView(frame: CGRect(x: 0, y: 0, width: self.view.frame.width, height: self.view.frame.height))
//        
//        bg.image = UIImage(named: "deep.png")
//        //    bg.image = UIImage(named: "bg.jpg")
//        bg.layer.zPosition = -1
//        self.view.addSubview(bg)

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
//    func barChart() {
//        ChartLabel.textColor = PNGreenColor
//        ChartLabel.font = UIFont(name: "Avenir-Medium", size:23.0)
//        ChartLabel.textAlignment = NSTextAlignment.Center
//        ChartLabel.text = "Bar Chart"
//        
//        let barChart = PNBarChart(frame: CGRectMake(0, 135.0, 320.0, 200.0))
//        barChart.backgroundColor = UIColor.clearColor()
//        barChart.animationType = .Waterfall
//        barChart.labelMarginTop = 5.0
//        
//        barChart.xLabels = ["SEP 1","SEP 2","SEP 3","SEP 4","SEP 5","SEP 6","SEP 7"]
//        barChart.yValues = [1,24,12,18,30,10,21]
//        
//        barChart.strokeChart()
//        barChart.delegate = self
//        
//        self.view.addSubview(ChartLabel)
//        self.view.addSubview(barChart)
//        
//        self.title = "Bar Chart"
//    }
//    
//    func lineChart() {
//        // Add LineChart
//        ChartLabel.text = "Line Chart"
//        
//        let lineChart:PNLineChart = PNLineChart(frame: CGRectMake(0, 135.0, 320, 200.0))
//        lineChart.yLabelFormat = "%1.1f"
//        lineChart.showLabel = true
//        lineChart.backgroundColor = UIColor.clearColor()
//        lineChart.xLabels = ["SEP 1","SEP 2","SEP 3","SEP 4","SEP 5","SEP 6","SEP 7"]
//        lineChart.showCoordinateAxis = true
//        lineChart.delegate = self
//        
//        // Line Chart Nr.1
//        var data01Array: [CGFloat] = [60.1, 160.1, 126.4, 262.2, 186.2, 127.2, 176.2]
//        let data01:PNLineChartData = PNLineChartData()
//        data01.color = PNGreenColor
//        data01.itemCount = data01Array.count
//        data01.inflexionPointStyle = PNLineChartData.PNLineChartPointStyle.PNLineChartPointStyleCycle
//        data01.getData = ({(index: Int) -> PNLineChartDataItem in
//            let yValue:CGFloat = data01Array[index]
//            let item = PNLineChartDataItem(y: yValue)
//            return item
//        })
//        
//        lineChart.chartData = [data01]
//        lineChart.strokeChart()
//        
//        self.view.addSubview(lineChart)
//        self.view.addSubview(ChartLabel)
//        self.title = "Line Chart"
//    }
//
//
}

//extension TranscriptDetailViewController : PNChartDelegate {
//    
//    func userClickedOnLineKeyPoint(point: CGPoint, lineIndex: Int, keyPointIndex: Int)
//    {
//        print("Click Key on line \(point.x), \(point.y) line index is \(lineIndex) and point index is \(keyPointIndex)")
//    }
//    
//    func userClickedOnLinePoint(point: CGPoint, lineIndex: Int)
//    {
//        print("Click Key on line \(point.x), \(point.y) line index is \(lineIndex)")
//    }
//    
//    func userClickedOnBarChartIndex(barIndex: Int)
//    {
//        print("Click  on bar \(barIndex)")
//    }
//    
//}
