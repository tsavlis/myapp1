import React,{Component} from 'react';
import { StyleSheet, View ,ActivityIndicator,FlatList,WebView } from 'react-native';
import { SearchBar,List} from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../Store/actions/articles_action';
import {navigatorDrawer,navigatorDeepLink} from '../../utils/misc';
import Article from '../Articles';
import HorizontalScrollIcons from './horizontal_scroll_icons';




class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
      categories: ['All', 'Sports', 'Music', 'Politics', 'E-gaming'],
      categorySelected: "All"
    }
    this.fetchNews = this.fetchNews.bind(this);

    this.props.navigator.setOnNavigatorEvent((event) => {
      navigatorDeepLink(event, this)
      navigatorDrawer(event,this)
    })
  }

  componentDidMount(){
    this.fetchNews();

  }
  updateCategoryHandler = (value) => {
    this.setState({
      refreshing:true,
      categorySelected: value,
      // articles:[]
    });
    // this.props.getArticles(value).then(() => {
    //   const newArticles = gridTwoColumns(this.props.Articles.list)

      this.setState({
        refreshing: false,
        // articles: newArticles
      })
    // }) 
  }

  fetchNews() {
    getArticles()
      .then(articles => this.setState({ articles, refreshing: false, }))
      .catch(() => this.setState({ refreshing: false,}));
  }
  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }
//  renderHeader = () => {
//    return <SearchBar
//    icon={{ type: 'font-awesome', name: 'search' }}
//    round
//    searchIcon={{ size: 4 }}
//    onChangeText={this.handleSearch}
//    onClearText={console.log('asd')}
//    placeholder='Type Here...' 
//    style={{width:"12%"}}/>
//  }
//  handleSearch = (text) => {
//    this.setState({query:text});
//  }

  render() {
    if (this.state.refreshing) {
      return (
        <View style={styles.refreshing}>
          <ActivityIndicator />
        </View>
      )
    } else {
    return (
      <View>
    {/*<SearchBar
    lightTheme
  icon={{ type: 'font-awesome', name: 'search', size:'12' }}
  round
  onChangeText={this.handleSearch}
  onClearText={console.log('asd')}
  placeholder='Type Here...' 
  containerStyle={{height:'7%',backgroundColor:"#fff"}}
   
       /> */}
      <HorizontalScrollIcons
      categories={this.state.categories}
      categorySelected={this.state.categorySelected}
      updateCategoryHandler={this.updateCategoryHandler}
    />  
        <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
        // ListHeaderComponent={this.renderHeader}
        />
      </View>
          );
  }
}
}
const styles = StyleSheet.create({
  refreshing: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
function mapStateToProps(state) {
  return {
    Articles: state.Articles
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArticles }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

