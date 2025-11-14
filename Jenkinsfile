pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PSW  = credentials('dockerhub-password')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Suhas0448/DEVOPSPROJECT.git'
            }
        }

        stage('Docker Build') {
            steps {
                bat """
                echo Building Docker image...
                docker build -t jenkins-demo .
                """
            }
        }

        stage('Docker Login & Push') {
            steps {
                bat """
                echo Logging in to DockerHub...
                echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USER% --password-stdin

                echo Tagging image...
                docker tag jenkins-demo %DOCKERHUB_USER%/jenkins-demo:latest

                echo Pushing image...
                docker push %DOCKERHUB_USER%/jenkins-demo:latest
                """
            }
        }
    }

    post {
        success {
            echo "Build successful!"
        }
        failure {
            echo "Build failed!"
        }
    }
}
