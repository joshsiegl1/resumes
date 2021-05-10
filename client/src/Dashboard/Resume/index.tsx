import React, { useState, useEffect} from 'react'; 
import { connect } from 'react-redux'; 
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'

import { Application } from 'shared/constants/interfaces'; 

const Resume = ({applications, ViewId, dispatch}: {applications: Application[], ViewId: number, dispatch: any}): JSX.Element => { 

    let [ application, setApplication ] = useState<Application>(null); 
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); 

    useEffect(() => { 
        for (let i = 0; i < applications.length; i++) { 
            if (applications[i].id === ViewId) { 
                setApplication(applications[i]); 
                break; 
            }
        }

    }); 

    // const renderResume = (): JSX.Element => { 
    //     if (application === null) { 
    //         return (<div></div>)
    //     }

    //     let applicationLink = 'https://ebsjobapps.blob.core.windows.net/resumes/' + application.resume; 

    //     return (<iframe style={{width: '500px', marginTop: '50px'}} src={`https://docs.google.com/gview?url=${applicationLink}&embedded=true`} />)
    // }

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
      function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
      }



    const renderResume = (): JSX.Element => { 
        if (application === null) { 
            return (<div></div>)
        }

        let applicationLink = 'https://ebsjobapps.blob.core.windows.net/resumes/' + application.resume; 

        return (
        <div style={{width: '500px', marginTop: '50px'}}>
        <Document
            file={applicationLink}
            options={{
                cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
              }}
            onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} /> 
        <div style={{
            position: 'absolute', 
            bottom: '5%', 
            background: 'white', 
            left: '90%', 
            border: '1px solid lightgray', 
            padding: '10px'}}>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
        </Document>
        </div>)
    }

    return renderResume(); 
}

function mapStateToProps(state: any, ownProps: any) { 
    return { applications: state.applicationReducer, ViewId: ownProps.ViewId }; 
}

export default connect(mapStateToProps)(Resume); 