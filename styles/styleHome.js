import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;
import Constants from 'expo-constants';
const barHeight = Constants.statusBarHeight;

const headerHeight = 60;
const footerHeight = 68;
// const barHeight = Constants.statusBarHeight;


const styles = StyleSheet.create({
  tSplash:{
    width: ScreenWidth,
    height: ScreenHeight,  
  },

  // style footer
  tFooter:{
    backgroundColor: "#ffffff",
    paddingTop: 8,
    // borderTopColor: '#bbbbbb',
    // borderTopWidth: 1 / PixelRatio.get(),
    width: ScreenWidth,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 11,
    height: footerHeight,
    borderTopColor: '#b2b2b2',
    borderTopWidth: 1,
  },

  tFItem:{
    flex: 1,
    textAlign: "center",
    alignItems: 'center',
  },

  tFItemBoundIcon:{
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: 'center',
    height: 30,
    // backgroundColor: 'red',
    alignItems: "center",
  },
  tFItemText:{
    fontSize: 12,
    fontFamily: 'RobotoBold',
    marginTop: 5,
  },
  tContainerDefault:{
    zIndex: 10,
    position: 'relative',
    marginTop: 60 + 150,
  },
  marginBottomFooter:{
    marginBottom: footerHeight
  },  

  // Heaerder Base
  barHearder:{
    height: headerHeight + barHeight,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: barHeight,
    borderBottomColor: '#b2b2b2',
    borderBottomWidth: 1,
    position: 'relative',
    zIndex: 0,
  },
  logoHeader:{
    width: 99,
    height: 40, 
  },
  iconSearchHeader:{
    position:'absolute',
    bottom: 20,
    right: 40,
    zIndex: 999,
  },
  txtCenterHeader:{
    fontFamily: "RobotoBold",
    fontSize: 18
  },
  backHeader:{
    position:'absolute',
    bottom: 13,
    left: 20,
    width: 30,
    overflow: 'hidden',
  },
  
  
  
  
  
  
  padding20:{
    width: ScreenWidth-40,
    paddingLeft: 20,
  },


  slideHome: {
    width: ScreenWidth,
    height: ScreenWidth
  },
  itemsSlideHome: {
    width: ScreenWidth,
    height: ScreenWidth
  },

  cateHome: {
    width: ScreenWidth,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconCenter: {
    alignItems: "center",
    justifyContent: "center",
    width: ScreenWidth / 7,
    height: ScreenWidth / 7,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: ScreenWidth / 14,
  },
  textCateHome:{
    fontSize: 15,
    fontFamily:"RobotoRegular",
    textAlign: 'center'
  },
  bannerHome:{
    width:ScreenWidth-40,
    height:(ScreenWidth-40)/3,
    paddingLeft: 20,
  },
  itemsBannerHome:{
    width:ScreenWidth-40,
    height:(ScreenWidth-40)/3,
  },



  // danh sách sản phẩm small
  cateSmallHome:{
    width: ScreenWidth-20,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  itemsCateSmallHome:{
    width: (ScreenWidth-60)/2,
    margin: 10,
    overflow: 'hidden',
  },
  imgSmallHome:{
    width: (ScreenWidth-60)/2,
    height:(ScreenWidth-60)/2, 
  },
  bodySmallHome:{
    backgroundColor:'#000000',
    paddingTop:20,
    paddingBottom:10,
    alignItems: 'center',
    marginTop: -1,
  },
  titleSmall:{
    fontFamily: 'RobotoBold',
    color:'#FFFFFF',
    fontSize:20,
    textTransform:"uppercase",
  },
  viewAll:{
    color:'#FFFFFF',
    fontFamily: 'RobotoLight',
  },
  lineBlack:{
    marginBottom: 30,
    width: ScreenWidth-40,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsLine:{
    width: (ScreenWidth-60)/2,
    height: 2,
    backgroundColor: "#000000"
  },
  cateBigHome:{
    width: ScreenWidth-40,
    marginLeft: 20,
  },
  imgBigHome:{
    width: ScreenWidth-40,
    height: ScreenWidth-40,
  },
  imgBigHome:{
    width: ScreenWidth-40,
    height: ScreenWidth-40,
  },
  bodyBigHome:{
    alignItems: 'center',
  },
  titleBig:{
    color: "#000000",
    fontFamily: 'RobotoBold',
    fontSize: 28,
    textTransform: 'uppercase',
    margin: 15
  },
  viewNow:{
    fontSize: 15,
    fontFamily: 'RobotoLight',
    color: "#FFFFFF",
    backgroundColor: "#000000",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft: 15,
    paddingRight: 15,
    textTransform: "uppercase",
    marginBottom: 50,
  },


  // danh mục sản phẩn
  pageCategories:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8ff', 
  },
  tabListCategories:{
    width: '25%',
    minHeight: ScreenHeight,
  },
  listCategories:{
    width: '73%',
  },
  itemsTabCategories:{
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 1,
  },
  textTabCategories:{
    fontFamily:"RobotoRegular",
    fontSize: 18,
  },   
  activeItemsTabCategories:{
    backgroundColor: '#f8f8ff',
  },
  itemsCate:{
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',  
  },
  imgCate:{
    width: 80,
    height: 85,
    marginRight: 15,
    backgroundColor: '#eeecea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wImgCate:{
    width: 80,
    height: 85,
  },
  vNameCate:{
    width: '100%',
    justifyContent: "center",
    alignItems: "flex-start",
  },
  nameCate:{
    fontFamily:"RobotoRegular",
    fontSize: 16, 
  },
  filterProducts:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    // backgroundColor: 'red',
  },
  filterLeft:{
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    // backgroundColor: 'blue', 
    width: (ScreenWidth-40)/2,
  },
  filterRight:{
    flexDirection: 'row',  
    justifyContent: 'flex-end',
    width: (ScreenWidth-40)/2,
    // backgroundColor: 'red',
  },
  txtFilter:{
    fontFamily: 'RobotoLight',
    fontSize: 15,
    color: '#000000',
    lineHeight: 25,
  },
  itemProducts:{
    marginBottom: 40,
    width: ScreenWidth-40,
    // backgroundColor: 'red',
    marginLeft: 20,  
  },
  vImgItemPro:{
    width: ScreenWidth-40,
  },
  nameItemProducts:{
    fontFamily: 'RobotoRegular',
    marginBottom: 10,
    fontSize: 16,
    marginTop: 10,
    textTransform: 'uppercase',
  },  
  priceItemProducts:{
    fontFamily: 'RobotoRegular',
    fontSize: 15, 
  },
  slideImageProduct:{
    width: ScreenWidth,
    height: ScreenWidth*1.5,
    marginTop: barHeight,
    position: 'relative',
    zIndex: -1,
  },
  itemsSlideDetailProduct:{
    width: ScreenWidth,
    height: ScreenWidth*1.5,
  },
  backDetailP:{
    position: 'absolute',
    zIndex: 99,
    left: 20,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addDetailP:{  
    position: 'absolute',
    zIndex: 99,
    left: ScreenWidth-40-20,
    top: 10,
  },
  btnRa50:{
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tDetailProduct:{
    width: ScreenWidth-40,
    marginLeft: 20,
    paddingBottom: 25,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f3f8',
  },
  titleProduct:{
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: 'RobotoRegular',
  },
  titleHDetailProduct:{
    color: '#777777',
    fontFamily: 'RobotoRegular',
  },
  colorPriceProducts:{
    color: '#ff0700',
  },
  txtBlack:{
    color: '#000000',
    fontSize: 16,
  },
  vStyleProduct:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -20,
    // backgroundColor: 'red',
  },
  btnStylePro:{
    backgroundColor: '#eeeeee',
    color: '#000000',
    fontFamily: 'RobotoRegular',
    width: (ScreenWidth-100)/4,
    textAlign: 'center',
    lineHeight: (ScreenWidth-100)/8,
    height: (ScreenWidth-100)/8, 
    marginLeft: 20, 
    marginBottom: 20,
  },
  btnBorderActive:{
    borderWidth: 1,
    borderColor: '#ff0700',
  },
  headerSlo:{
    marginBottom: 10,
  },
  txtHD:{
    color:"#000000",
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: 160,
  },
  vNumberProduct:{
    flexDirection: 'row',
  },
  touchNumbers:{
    flexDirection:'row',

  },
  minusNumbers:{
    width: 30,  
    height: 30,
    lineHeight: 30,
    borderColor: '#dddddd',
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickTaskBottom:{
    flexDirection: 'row',
  },
  quickTouch:{
    backgroundColor: '#7f7f7f', 
    width: '50%',
    height: footerHeight,
  },
  quickTouchText:{
    color: '#FFFFFF',
    fontFamily: 'RobotoBold',
    lineHeight: footerHeight,
    textAlign: 'center',
    fontSize: 17,
  },
  tContainerImgModal:{
    width: ScreenWidth,
    height: ScreenHeight,
    height: '100%',
    paddingTop: barHeight + 30,
    paddingBottom: 25,
  },
  modalBgBlack:{
    backgroundColor: '#000000'
  },
  modalBgWhite:{
    backgroundColor: '#FFFFFF'
  },
  tModalBody:{
    height: ScreenHeight - barHeight - 30 - 125,
  },
  bgPopupScreen:{
    height: ScreenHeight,
    width: ScreenWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
    zIndex: 0,
  },
  visibalPop:{
    height: ScreenWidth,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    width: ScreenWidth-40,
    padding: 20,
    left: 20,
    bottom: 50,
    borderRadius: 10,
    zIndex: 9999,
  },
  tBtnModalSave:{
    width: 100,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
  tBtnModal:{
    width: 100,
    height: 50,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  tModalContent:{
    paddingLeft: 20,
  },
  txtModal:{
    fontFamily: 'RobotoRegular',
    fontSize: 17,
  },
  txtModalB:{
    color: '#000000',
  },
  txtModalW:{
    color: '#FFFFFF',
  },
  pageCart:{
    backgroundColor:'#eeeeee',
    height: ScreenHeight,
    width: ScreenWidth,
    position: 'relative',
    zIndex: 0,
    paddingBottom: footerHeight+85,
  },
  itemCart:{
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#c7c7c9',
    borderBottomWidth: 1,
  },
  infoItemCart:{
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 3,
    flexDirection: 'row',
  },
  imgItemCart:{
    marginRight:10, 
    height: (ScreenWidth-40)/5,
    width: (ScreenWidth -40)/5,
  },
  imgCart:{
    height: (ScreenWidth-40)/5,
    width: (ScreenWidth-40)/5,
  },  
  rightInfoItem:{
    // backgroundColor: 'green',
    width: (ScreenWidth-40)*4/5 -10,
  },
  lineTopItemCart:{

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tProductItemCart:{
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  fPriceItemCart:{
    color: '#ff0700',
    fontSize: 16,
    fontFamily: 'RobotoRegular',
  },
  txtBCart:{
    fontFamily: 'RobotoRegular',
    fontSize: 15,  
  },
  taskCart:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  editItemCart:{
    flexDirection:'row',
    marginLeft: 30
  },
  textTaskCart:{
      fontSize: 15,
      fontFamily: 'RobotoRegular',
      color: '#777777',
      paddingLeft: 5,
  },
  vBootTotalCt:{
    height: footerHeight,
    width: ScreenWidth,
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
  },
  totalPriceCart:{
    width: ScreenWidth-150,
    paddingLeft: 20,
  },
  payCart:{
    backgroundColor: '#000000',
    width: 150,
    alignItems: 'center',
  },
  txtPayN:{
    lineHeight: footerHeight,
  },







  // tin tức
  pageNews:{
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom:footerHeight+20,
  },
  itemNews:{
    marginTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#f2f2f2',  
    borderBottomWidth: 1,
  },
  vImgNews:{
    width:(ScreenWidth-40),
    height: (ScreenWidth-40)/2,
  },
  imgNews:{
    width:(ScreenWidth-40),
    height: (ScreenWidth-40)/2,
  },
  bodyNews:{
    marginTop: 20,
  },
  titleNews:{
    fontFamily: "RobotoBold",
    fontSize: 18,
    textTransform: 'uppercase',
  },
  vDateNews:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom:10,
    marginTop: 10,
  },
  nDateNameNews:{
    marginRight: 10,
    color: '#777777',
    fontSize: 12,
  },
  txtBriefNews:{
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    textAlign: 'justify',
  },
  txtBriefDetailNews:{
    fontSize: 16,
    fontFamily: 'RobotoBold',
    textAlign: 'justify',
  },
  txtDescriptNews:{
    fontFamily: 'RobotoRegular',
    fontSize: 15,
    textAlign: 'justify',
  },
  pageDetailNews:{
    paddingBottom: 68,
  },
  bodyDetailNews:{
   paddingLeft: 20,
   paddingRight: 20, 
  },
  tagsDetailNews:{
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // backgroundColor: 'red',
    marginTop: 20,
    marginBottom: 20,
  },
  txtTagsDetailNews:{
    fontSize: 18,
    fontFamily: 'RobotoBold',
  },
  txtTagsN:{
    color: '#555555',
    fontSize: 15,
  },
  otherNews:{
    borderTopWidth: 2,
    borderTopColor: '#eeeeee',
  },
  vHeaderOtherNews:{
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 3,
    position: 'relative',
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
  },
  txtOtherNews:{
    fontSize: 18,
    fontFamily: "RobotoBold",
  },
  brBottomOther:{
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
    position: 'absolute',
    width: 60,
    bottom: -3,
    left: 20,
  },
  listCateNews:{
    position: 'absolute',
    width: ScreenWidth-40,
    marginLeft: 20,
    backgroundColor: "#FFFFFF", 
    top: barHeight + headerHeight -1,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    padding: 20,
  },
  itemHeaderCateNews:{
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    position: 'relative',
    zIndex: 9999999,
  },
  txtCateHeaderNews:{
    fontFamily: "RobotoRegular",
    fontSize: 16,
  },
  borderCateNews:{  
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  // style tam giác
  trianleTop:{
    position: 'absolute',
    top: -9,
    right: 23,
    zIndex: 999,
    paddingBottom: 2,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },


  // Videos 
  itemVideos:{
    marginBottom: 30,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  styleVideos:{
    width: ScreenWidth-40,
    height: (ScreenWidth-40)*2/3,
  },
  txtTitleVideos:{
    marginBottom: 15,
    marginTop: 15,
    fontFamily: "RobotoBold",
    fontSize: 16,
  },



  // showrooms
  pageShowrooms:{
    marginBottom: footerHeight,
  },
  vMap:{
    width: ScreenWidth,
    height: ScreenWidth*1.5/3,
    // backgroundColor: 'green',
  },
  bSelectShowrooms:{
    padding: 20,
    paddingBottom: 0,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  txtShowrooms:{
    fontFamily: "RobotoBold",
    fontSize: 15,
    marginBottom: 10,
  },
  borSelectSR:{
    borderWidth: 1,
    borderColor: '#c2bcb2',
    borderRadius: 5,
    width: ScreenWidth-40,
    marginBottom: 20,
  },
  sSelectBox:{
    width: ScreenWidth-40,
    height: 40,
  },
  itemShowrooms:{
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    padding: 20,
  },
  txtNameShowrooms:{
    fontSize: 16,
    fontFamily: "RobotoBold",
    color: '#007bff',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  txtAddShowrooms:{
    fontSize: 14,
    fontFamily: "RobotoRegular",
    color: '#555555',
  },



  // search
  boxSearch:{
    backgroundColor: '#c9c8ce',
    padding: 20,
  },
  vInpSearch:{
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: ScreenWidth-40,
    position: 'relative',
    paddingLeft: 40,

  },
  iconTouchSearch:{
    position: 'absolute',
    top: 5,
    left: 10,
  },
  inputSearch:{
    height: 40,

  },












  
});    
export default styles;