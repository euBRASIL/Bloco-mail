const mobileStyles = {
  backgroundColor: '#fff',

  '& .MuiCard-root': {
    padding: 0,
    marginTop: '20px',
  },
  '& .MuiToolbar-root': {
    display: 'none'
  },
  '& .MuiTabs-root': {
    minHeight: 0,
    marginBottom: '22px',
  },
  '& .MuiTab-root': {
    marginRight: '11px',
    padding: 0,
    minHeight: 0,
    paddingRight: '11px',
    borderRight: '1px solid #ccc',
    fontSize: '14px',
    color: '#2E2E2E',

    '&.Mui-selected': {
      color: '#E95843',
      fontWeight: 'bold',
    },
    '&:last-child': {
      borderRight: 'none'
    }
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  }
}

export default mobileStyles;