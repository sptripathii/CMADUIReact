pipeline {
    agent any

    tools {
      nodejs 'NodeJS 11.8.0'
    }
    
    environment {
           registry = "sptripathii/be-ui-image"
           registryCredential = 'dockerhub'
           dockerImage = ''
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing..'
                echo 'testing done'
            }
        }
        stage('Package') {
            steps {
                echo 'Packaging....'
		sh 'npm run build'
            }
        }
        stage('Building image') {
            steps{
	       echo 'Building docker image...'	    
               script {
                  dockerImage = docker.build(registry)
               }
            }      
        } 
        stage('Deploy Image') {
             steps{
	       echo 'Deploying docker image...'     
                script {
                     docker.withRegistry( '', registryCredential ) {
                         dockerImage.push()
               	     }
                }
             }
         }
    }
}
