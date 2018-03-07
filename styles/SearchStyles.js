import { StyleSheet } from 'react-native';
import { colorOrange, colorLightGrey, colorDarkGrey } from './Constants';

const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorLightGrey,
  },
  bodyContainer: {
    flex: 9,
    backgroundColor: 'white',
  },
  input: {
    borderColor: colorDarkGrey,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    margin: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  listButtonContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  listButtonText: {
    fontFamily: 'hind',
    fontSize: 18,
    color: colorDarkGrey,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
})

export default SearchStyles
