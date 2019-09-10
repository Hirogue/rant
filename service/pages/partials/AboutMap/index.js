import React, { useEffect } from 'react';

export default (props) => {

	useEffect(() => {
		const BMap = window.BMap;
		const map = new BMap.Map('allmap'); // 创建Map实例
		const point = new BMap.Point(115.858315, 28.665046);

		map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别
		map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] })); //添加地图类型控件
		map.setCurrentCity('南昌'); // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放ww

		// 初始化地图， 设置中心点坐标和地图级别

		const marker = new BMap.Marker(point);
		map.addOverlay(marker);
		//marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

		const opts = {
			width: 200, // 信息窗口宽度
			height: 100, // 信息窗口高度
			title: '', // 信息窗口标题
			enableMessage: false, //设置允许信息窗发送短息
			message: '江西省南昌市红谷滩学府大道1号阿尔法写字楼34栋六楼'
		};
		const infoWindow = new BMap.InfoWindow(opts.message, opts); // 创建信息窗口对象
		map.openInfoWindow(infoWindow, point);
		marker.addEventListener('click', function () {
			map.openInfoWindow(infoWindow, point); //开启信息窗口
		});
	}, []);

	return <div id="allmap" style={{ width: '100%', height: '500px' }} />;
}
