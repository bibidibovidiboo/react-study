import React, {Component, Fragment} from 'react'
import $ from 'jquery'

/*global kakao*/
class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            vo:{},
            isShow:0
        }

    }
    martDetail(vo)
    {
        //this.state.ishow=1;
        this.setState({isShow:1,vo:vo})
    }

    mapPrint(road_addr,market_nm)
    {
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=5f40375643f0a41df8b2401ad0739717&libraries=services";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                var mapContainer = document.getElementById('map'),
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667),
                        level: 3
                    };


                var map = new kakao.maps.Map(mapContainer, mapOption);


                var geocoder = new kakao.maps.services.Geocoder();


                geocoder.addressSearch(road_addr, function (result, status) {


                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);


                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });


                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+market_nm+'</div>'
                        });
                        infowindow.open(map, marker);


                        map.setCenter(coords);
                    }
                })
            })
        }
    }

    componentDidMount()
    {
        $('#keyword').keyup(function(){
            let k=$('#keyword').val();

            $('#user-table > tbody > tr').hide();
            let temp=$('#user-table>tbody>tr>p:contains("'+k+'")');
            $(temp).parent().show();
        })

        this.mapPrint(this.state.road_addr)

    }
    // 화면 출력
    render() {
        const html=this.props.mart.map((m)=>
            <tr className={"list-group-item"} onClick={this.martDetail.bind(this,m)}  style={{"cursor":"pointer","padding-top": "22px","border-bottom":"1px solid #dadada","border-top":"1px solid #dadada"}}>
                <p style={{"font-size":"16px"}} onClick={this.mapPrint.bind(this,m.road_addr,m.market_nm)}>{m.market_nm}</p>
                <p style={{"color":"#7f7f7f"}}>{m.road_addr}</p>
            </tr>
        )
        return(
            <div className={"row"}>
                <div className={"col-sm-12"}><h1 className={"text-center"} style={{"padding":"0 0 30px","font-weight":"300","color":"#fff","font-size":"37px"}}>우리 동네 마트 찾기</h1></div>
                <div className={"col-sm-12"}>
                    <input type={"text"} id={"keyword"}  className={"form-control"}
                           style={{"margin": "0 auto","width":"49%","background-image" : "url('https://postfiles.pstatic.net/MjAyMDEyMThfOTUg/MDAxNjA4MjIzMTU2NTcw.urREhTjDbxoDqMpUL9G1YzTplDOTXp0QnbJwFZmQKsUg.G1Kt2m17EFSbRs9cbBwP9k0uRO1O7OokYRbpu5oCi9wg.PNG.hartring/find.png?type=w966')","background-position":"top right","background-repeat":"no-repeat","background-size": "contain","border-radius":"25px"}}/>
                </div>
                <div className={"col-sm-6"}>
                    <div style={{"height":"70px"}}></div>
                    <table className={"table"} id={"user-table"} style={{"width":"96%","margin-left":"28px"}}>
                        <tbody>
                        {html}
                        </tbody>
                    </table>
                </div>
                <div className={"col-sm-6"}>
                    {this.state.isShow==1?<MartDetail m={this.state.vo}/>:null}
                </div>
            </div>
        )
    }
}
class MartDetail extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <ul className={"list-group"} style={{"margin-top":"70px","width":"500px","height":"390px"}}>
                <li className={"list-group-item"}>
                    <img src={this.props.m.poster} style={{"width":"470px","height":"300px"}}/>
                    <p style={{"margin":"19px 0px 5px","font-size":"21px"}}>{this.props.m.market_nm}</p>
                    <p style={{"margin":"3px 0 4px 1px","color":"#7b7b7b"}}>{this.props.m.faclt_div_nm}</p>
                </li>
                <li className={"list-group-item"} style={{"color":"#4e4e4e","border-top":"1px solid #dadada"}}>
                    <span className={"glyphicon glyphicon-map-marker"}></span>
                    <span style={{"padding":"1px 0px 0px 10px","font-weight":"300"}}>{this.props.m.road_addr}</span>
                </li>
                <li className={"list-group-item"} style={{"color":"#4e4e4e","border-top":"1px solid #dadada"}}>
                    <span className={"glyphicon glyphicon-earphone"}></span>
                    <span style={{"padding":"1px 0px 0px 10px","font-weight":"300"}}>{this.props.m.telno}</span>
                </li>

                <li className={"list-group-item"} style={{"border-top":"1px solid #dadada","padding-top": "14px","padding-bottom": "20px"}}>
                    <div id="map" style={{"width": "100%", "height": "350px"}}></div>
                </li>

            </ul>
        )
    }
}
export default App;
