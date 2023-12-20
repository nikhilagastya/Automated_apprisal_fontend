import React from 'react'
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

const addPublicationRow = window.addPublicationRow

const addPresentationRow = window.addPresentationRow 

const addProjectRow = window.addProjectRow 

const addCertificationRow = window.addCertificationRow 

const addContributionRow = window.addContributionRow 

const addExamDutyRow = window.addExamDutyRow 

const addAssessmentByHoDRow = window.addAssessmentByHoDRow 

const addSummaryAPIScoresRow = window.addSummaryAPIScoresRow 

const addContributionNSSNCCRow = window.addContributionNSSNCCRow 

const addRow = window.addRow 

const addFacultyAssessmentRow = window.addFacultyAssessmentRow 


export default function Api_form() {

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const formElement = document.getElementById('appraisal');
    //       const pdf = await html2pdf(formElement);
    //         console.log(pdf);
    //       let info = localStorage.getItem("Details");
    //       info = JSON.parse(info);
    //       console.log(info.department);
      
    //       // Step 1: Fetch professor details
    //       const response = await fetch('http://localhost:5000/get_prof', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           dept: info.department,
    //         }),
    //       });
      
    //       if (!response.ok) {
    //         console.error('Error fetching professor details:', response.statusText);
    //         return;
    //       }
      
    //       const professorData = await response.json();
    //       const professorEmail = professorData.data.email;
    //       console.log('Email ID of Professor:', professorEmail);
    //       const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
    //       // Step 2: Save PDF file to MongoDB using the send_file route
    //       const formData = new FormData();
    //       formData.append('file', pdfBlob, 'appraisal.pdf');
    //       formData.append('email', professorEmail);
      
    //       const saveFileResponse = await fetch('http://localhost:5000/send_file', {
    //         method: 'POST',
    //         body: formData,
    //       });
      
    //       if (saveFileResponse.ok) {
    //         console.log('PDF file saved successfully');
    //       } else {
    //         console.error('Error saving PDF file:', saveFileResponse.statusText);
    //       }
    //     } catch (error) {
    //       console.error('Error generating PDF or fetching professor details:', error);
    //     }
    //   };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let info = localStorage.getItem("Details");
          info = JSON.parse(info);
          console.log(info.department);
      
          // Step 1: Fetch professor details
          const response = await fetch('http://localhost:5000/get_prof', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              dept: info.department,
            }),
          });
      
          if (!response.ok) {
            console.error('Error fetching professor details:', response.statusText);
            return;
          }
      
          const professorData = await response.json();
          const professorEmail = professorData.data.email;
          const professorFirstName = info.firstName; // Assuming the property name is 'firstName'
          console.log('Email ID of Professor:', professorEmail);
      
          var doc = new jsPDF('p', 'pt', 'a3');
          doc.html(document.getElementById("appraisal"), {
            callback: async function (pdf) {
              // Save the PDF locally
              pdf.save("mypdf.pdf");
      
              // Create a Blob from the PDF data
              const pdfBlob = await pdf.output('blob');
      
              // Step 2: Save PDF file to MongoDB using the send_file route
              const formData = new FormData();
              formData.append('file', pdfBlob, 'appraisal.pdf'); // Append the PDF Blob to the form data
              formData.append('email', professorEmail);
              formData.append('firstname', professorFirstName);
              formData.append('approved', false);
              formData.append('emailby', info.email);
                
              const saveFileResponse = await fetch('http://localhost:5000/send_file', {
                method: 'POST',
                body: formData,
              });
      
              if (saveFileResponse.ok) {
                console.log('PDF file saved successfully');
              } else {
                console.error('Error saving PDF file:', saveFileResponse.statusText);
              }
            }
          });
        } catch (error) {
          console.error('Error generating PDF or fetching professor details:', error);
        }
      };
      

  return (
   <>
   <div>
    <form id='appraisal'>
    <div className="container">
        <h1>Academic Performance Appraisal Form</h1>
        <form id="appraisalForm">
            <div className="form-group">
                <label for="facultyName">Name of the faculty:</label>
                <input type="text" id="facultyName" name="facultyName" required />
            </div>
            <div className="form-group">
                <label for="department">Department:</label>
                <input type="text" id="department" name="department" required />
            </div>
            <div className="form-group">
                <label for="designation">Designation:</label>
                <input type="text" id="designation" name="designation" required />
            </div>
            <div className="form-group">
                <label for="dateOfJoining">Date of Joining:</label>
                <input type="date" id="dateOfJoining" name="dateOfJoining" required />
            </div>
            <div className="form-group">
                <label for="totalExperience">Total experience (Years):</label>
                <input type="number" id="totalExperience" name="totalExperience" required />
            </div>
            <div className="form-group">
                <label for="teachingExperience">Teaching Experience (Years):</label>
                <input type="number" id="teachingExperience" name="teachingExperience" required />
            </div>
            <div className="form-group">
                <label for="industryExperience">Industry Experience (Years):</label>
                <input type="number" id="industryExperience" name="industryExperience" required />
            </div>
           
        </form>

        <div className="teaching-performance">
            <h2>Academic Work - Teaching Performance indicator for AY 2021-22 (Max. Score: 40)</h2>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Course/Semester</th>
                        <th>Course taught</th>
                        <th>No. of classNamees engaged per week</th>
                        <th>Result (Pass Percentage)</th>
                        <th>API Score for Results (Max. 20)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1st Semester</td>
                        <td><input type="text" name="course1" required /></td>
                        <td><input type="number" name="classNameesPerWeek1" required /></td>
                        <td><input type="number" name="passPercentage1" required /></td>
                        <td><input type="number" name="apiScoreResults1" required /></td>
                    </tr>
                    
                    <tr>
                        <td>2</td>
                        <td>2nd Semester</td>
                        <td><input type="text" name="course2" required /></td>
                        <td><input type="number" name="classNameesPerWeek2" required /></td>
                        <td><input type="number" name="passPercentage2" required /></td>
                        <td><input type="number" name="apiScoreResults2" required /></td>
                    </tr>
                    
                </tbody>
            </table>

            <h3>Average percentage</h3>
            <input type="number" name="averagePercentage" required />

            <h3>Total API score (Results + Feedback)</h3>
            <input type="number" name="totalAPIScore" required />
        </div>

        
      
        <div className="research-development">
            <h2>Research and Development (Max. Score: 25)</h2>
            <div>
                <label>i. Are you possessing Ph. D.? </label>
                <select name="phdPossession" required >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select>
                
            </div>
            <div>
                <label>ii. Are you registered for Ph. D.? </label>
                <select name="phdRegistered" required >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select>
                
            </div>

            
            
            
        </div>

        
        
        

        
        <div className="research-development">
            <h2>Research and Development (Max. Score: 25)</h2>
            

            
            <div className="phd-registration">
                <h3>Ph.D. Registration Details</h3>
                <div>
                    <label>Name of the University:</label>
                    <input type="text" name="universityName" required />
                </div>
                <div>
                    <label>Date of Registration:</label>
                    <input type="date" name="registrationDate" required />
                </div>
                <div>
                    <label>Supervisor’s Name:</label>
                    <input type="text" name="supervisorName" required />
                </div>
                <div>
                    <label>Co-Supervisor’s Name (if applicable):</label>
                    <input type="text" name="coSupervisorName"/>
                </div>
                <div>
                    <label>Pre-Ph.D completed ?</label>
                    <select name="prePhdCompleted" required >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          </select>
                    
                    <label>Date of completion:</label>
                    <input type="date" name="dateOfCompletion" />
                </div>
                <div>
                    <label>Expected completion date:</label>
                    <input type="date" name="expectedCompletionDate" required />
                </div>
                <div>
                    <label>*Attach the document of the latest completed status:</label>
                    <input type="file" accept="application/pdf,image/jpeg,image/png" name="documentAttachment"/>
                </div>
            </div>

            
            
        </div>

        
        

        


        
        

        
        <div className="research-development">
            <h2>Research and Development (Max. Score: 25)</h2>

            
            <div className="phd-registration">
                
            </div>

            
            <div className="publications">
                <h3>Publication of Research papers / Book chapters / Books (Max. Score: 10)</h3>
                <table id="publicationTable">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title with Page No’s**</th>
                            <th>Journal name & type (WoS, Scopus, UGC approved)</th>
                            <th>ISSN/ISBN No.</th>
                            <th>Year of Publication</th>
                            <th>Impact factor</th>
                            <th>No. of co-authors</th>
                            <th>Whether you are the main author (Y/N)</th>
                            <th>API Score (Max. 10)*</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="sno1" required /></td>
                            <td><input type="text" name="title1" required /></td>
                            <td><input type="text" name="journalNameType1" required /></td>
                            <td><input type="text" name="issnIsbn1"/></td>
                            <td><input type="number" name="yearOfPublication1" required /></td>
                            <td><input type="number" step="0.01" name="impactFactor1" required /></td>
                            <td><input type="number" name="coAuthors1" required /></td>
                            <td>
                                <select name="mainAuthor1" required >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
             </select>
                            </td>
                            <td><input type="number" name="apiScore1" max="10" required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onClick={addPublicationRow}>Add Publication</button>
                <p>*For each publication in WoS - 5 Points, Scopus- 3 Points, UGC – 1 Point, Book Chapter – 1 Point, and Book – 2 Points</p>
                <p>**Attach the Proof of indexing in WoS / Scopus and Book Chapter.</p>
            </div>

            
            
        </div>

       
        
        

        
        <div className="research-development">
            <h2>Research and Development (Max. Score: 25)</h2>

            
            <div className="phd-registration">
                
            </div>

            
            <div className="publications">
                
            </div>

            
            <div className="presentations">
                <h3>Presentation/Participation in Conference/Seminar/Workshop/Symposia/FDP (Max. Score: 5)</h3>
                <table id="presentationTable">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title of the paper presented</th>
                            <th>Name of the Conference/Seminar</th>
                            <th>Organized by</th>
                            <th>International/National</th>
                            <th>No. of days</th>
                            <th>API Score (Max. 5)*</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="presentationSno1" required /></td>
                            <td><input type="text" name="presentationTitle1" required /></td>
                            <td><input type="text" name="conferenceName1" required /></td>
                            <td><input type="text" name="organizedBy1" required /></td>
                            <td>
                                <select name="internationalOrNational1" required >
                <option value="International">International</option>
                <option value="National">National</option>
                </select>
                            </td>
                            <td><input type="number" name="daysAttended1" required /></td>
                            <td><input type="number" name="presentationApiScore1" max="5" required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onClick={addPresentationRow}>Add Presentation</button>
                <p>*Participation & presentation – 2 Points, Participation -1 Point; FDP = 5 Days - 3 Points</p>
            </div>

            
            
        </div>

        

        
        

        
        <div className="research-development">
            <h2>Research and Development (Max. Score: 25)</h2>

            
            <div className="phd-registration">
                
            </div>

            
            <div className="publications">
                
            </div>

            
            <div className="presentations">
                
            </div>

            
            <div className="projects-patents">
                <h3>Sanction of funded projects/patents, and applied Projects (Max. Score: 5)</h3>
                <table id="projectsTable">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title of the funding proposal / Patent details</th>
                            <th>Funding agency/Patent office details</th>
                            <th>Status (Completed/In progress/submitted)</th>
                            <th>API Score (Max. 5)*</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="projectSno1" required /></td>
                            <td><input type="text" name="projectTitleDetails1" required /></td>
                            <td><input type="text" name="fundingAgencyDetails1" required /></td>
                            <td><input type="text" name="projectStatus1" required /></td>
                            <td><input type="number" name="projectApiScore1" max="5" required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onClick={addProjectRow}>Add Project</button>
                <p>*Approved/Sanctioned Projects – 5 Points, Projects Applied -1 Point, Patent Grant – 3 Points, Patent Publication– 2 Points</p>
            </div>

            
            
        </div>

     
        
        

        
        <div className="research-development">
            <h2>Research and Development (Max. Score: 25)</h2>

            
            <div className="phd-registration">
                
            </div>

            
            <div className="publications">
                
            </div>

            
            <div className="presentations">
                
            </div>

            
            <div className="projects-patents">
                
            </div>

            
            <div className="certifications-awards">
                <h3>Online certifications from reputed organizations and Awards received/Qualified in NET or SET (Max. Score: 5)</h3>
                <table id="certificationsTable">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name of the Certification / Programme</th>
                            <th>Organization from which it is acquired</th>
                            <th>Percentage score</th>
                            <th>API Score (Max. 5)*</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="certificationSno1" required /></td>
                            <td><input type="text" name="certificationName1" required /></td>
                            <td><input type="text" name="certificationOrganization1" required /></td>
                            <td><input type="number" step="0.01" name="certificationPercentage1" required /></td>
                            <td><input type="number" name="certificationApiScore1" max="5" required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onClick={addCertificationRow}>Add Certification/Award</button>
                <p>* Each certification - 2 Points, National Award – 2 Points, International Award – 4 Points, NET/SET – 5 Points</p>
            </div>

            
        </div>

       

        
        

        
        <div className="research-development">
            <h2>Research and Development (Max. Score: 25)</h2>

            
            <div className="phd-registration">
                
            </div>

            
            <div className="publications">
                
            </div>

            
            <div className="presentations">
                
            </div>

            
            <div className="projects-patents">
                
            </div>

            
            <div className="certifications-awards">
                
            </div>

            
            <div className="contribution">
                <h3>Contribution to the Department/School/University (Max. Score: 5)</h3>
                <table id="contributionTable">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name of the Activity organized</th>
                            <th>Contribution of the Faculty Member</th>
                            <th>API Score (Max. 5)*</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="contributionSno1" required /></td>
                            <td><input type="text" name="activityName1" required /></td>
                            <td><input type="text" name="facultyContribution1" required /></td>
                            <td><input type="number" name="contributionApiScore1" max="5" required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onClick={addContributionRow}>Add Contribution</button>
                <p>*Each Activity – 2 Points</p>
            </div>

            
        </div>

        

        
        <div className="contribution">
            
        </div>

        
        <div className="examination-duties">
            <h3>Examination duties assigned and performed (Max. Score: 5)</h3>
            <table id="examinationTable">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Type of examination duty Assigned</th>
                        <th>Extent to which the assigned work was carried out</th>
                        <th>API Score (Max. 5)*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" name="examDutySno1" required /></td>
                        <td><input type="text" name="examDutyType1" required /></td>
                        <td><input type="text" name="examDutyExtent1" required /></td>
                        <td><input type="number" name="examDutyApiScore1" max="5" required /></td>
                    </tr>
                </tbody>
            </table>
            <button type="button" onClick={addExamDutyRow}>Add Examination Duty</button>
            <p>*Each Duty - 2 Points</p>
        </div>

        
    {/* </div> */}

   
   
    
    <div className="container">
        <h2>V. Academic/Co-Curricular/Extra Curricular/Social Contribution/NSS/NCC (Max. Score: 5)</h2>
        <table id="contributionNSSNCCTable" border="1">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Responsibilities assigned</th>
                    <th>Contribution of the faculty</th>
                    <th>API Score (Max. 5)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><input type="text" name="responsibilitiesAssigned1" required /></td>
                    <td><input type="text" name="contributionOfFaculty1" required /></td>
                    <td><input type="number" name="apiScore1" max="5" required /></td>
                </tr>
            </tbody>
        </table>
        <button onClick={addRow}>Add Row</button>
    </div>

   
    <div className="container">
        <h2>VI. Assessment of the Faculty by the Head of the Dept. (Max. Score: 20)</h2>
        <table id="facultyAssessmentTable" border="1">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Items to be considered</th>
                    <th>API Score (Max. 20)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><input type="text" name="itemsConsidered1" required /></td>
                    <td><input type="number" name="apiScore1" max="20" required /></td>
                </tr>
            </tbody>
        </table>
        <button onClick={addFacultyAssessmentRow}>Add Row</button>
    </div>

   
    <div className="container">
        <h2>VII. Summary of API Scores (to be filled by the HoD)</h2>
        <table id="summaryAPIScoresTable" border="1">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Criteria</th>
                    <th>Maximum Score</th>
                    <th>Total API Score attained</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>I</td>
                    <td>Academic Work (a+b)</td>
                    <td>40</td>
                    <td><input type="number" name="totalAPIScore1" required /></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Research work (a+b+c+d)</td>
                    <td>25</td>
                    <td><input type="number" name="totalAPIScore2" required /></td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>Contribution to the University and co-curricular activities along with HoD assessment (III+IV+V+VI)</td>
                    <td>35</td>
                    <td><input type="number" name="totalAPIScore3" required /></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Total</td>
                    <td>100</td>
                    <td><input type="number" name="totalAPIScore3" required /></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    </div>
    </form>
    <button onClick={handleSubmit}>Submit</button>

</div>
   </>
  )
}
