import { StudentID, Student, Course, CourseGrade, Transcript } from './Types'
import { IDataBase } from './IDataBase'

export default class DataBase implements IDataBase {

    /** the list of transcripts in the database */
    private transcripts : Transcript [] = []

    /** the last assigned student ID 
     * @note Assumes studentID is Number
    */
    private lastID : number

    constructor () {this.lastID = 0}

    /** Adds a new student to the database
     * @param {string} newName - the name of the student
     * @returns {StudentID} - the newly-assigned ID for the new student
     */
    addStudent (newName: string): StudentID {
        const newID = this.lastID++
        const newStudent: Student = { studentID: newID, studentName: newName }
        this.transcripts.push({student: newStudent, grades: []})
        return newID
    }


    /**
     * @param studentName 
     * @returns list of studentIDs associated with that name
     */
    nameToIDs (studentName: string) : StudentID[] {
        return this.transcripts
            .filter(t => t.student.studentName === studentName)
            .map(t => t.student.studentID)
    }


    /**
     * 
     * @param id - the id to look up
     * @returns the transcript for this ID
     */
    getTranscript (id: StudentID): Transcript {
        const ret : Transcript | undefined = this.transcripts.find(t => t.student.studentID === id)
            if (ret === undefined) {throw new Error("unknown ID")}
            else {return ret}
    }

        
    deleteStudent (id: StudentID): void  {
        throw new Error("not implemented yet")  
    }   

    addGrade(id: Student, course: Course, courseGrade: CourseGrade): void {
        const studentTranscript = this.getTranscript(id.studentID);
        if (!studentTranscript) {
            throw new Error("student ID not found");
        }

        if (courseGrade.grade < 0) {
            throw new Error("invalid grade");
        }

        const index = studentTranscript.grades.findIndex(g => g.course === course);
        if (index !== -1) {
            studentTranscript.grades[index] = courseGrade;
        } else {
            studentTranscript.grades.push(courseGrade);
        }
    }

    getGrade(id: Student, course: Course): CourseGrade {
        const transcript = this.getTranscript(id.studentID);
        if (!transcript) {
            throw new Error("unknown student ID");
        }
        const grade = transcript.grades.find(g => g.course === course);
        if (!grade) {
            throw new Error("student isn't taking that course");
        }
        return grade;
    }

    getAllStudentIDs(): StudentID[] {
        return this.transcripts.map(t => t.student.studentID);
    }
    
    
}
    