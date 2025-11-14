pipeline {
    agent any

    environment {
        DOCKER = credentials('dockerhub-username')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Suhas0448/DEVOPSPROJECT.git'
            }
        }

        stage('Build Docker Image') {
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
                echo Logging in...
                docker login -u ${DOCKER_USR} -p ${DOCKER_PSW}

                echo Tagging...
                docker tag jenkins-demo ${DOCKER_USR}/jenkins-demo:latest

                echo Pushing image...
                docker push ${DOCKER_USR}/jenkins-demo:latest
                """
            }
        }
    }

    post {
        success {
            emailext(
                to: "suhasgaripally@gmail.com",
                subject: "SUCCESS: Jenkins Build #${BUILD_NUMBER}",
                body: """
Hello Suhas,

Your Jenkins pipeline executed successfully!

Job: ${JOB_NAME}
Build Number: ${BUILD_NUMBER}

Image pushed to DockerHub:
${DOCKER_USR}/jenkins-demo:latest

Regards,
Jenkins CI/CD
                """
            )
            echo "Build SUCCESS!"
        }

        failure {
            emailext(
                to: "suhasgaripally@gmail.com",
                subject: "FAILURE: Jenkins Build #${BUILD_NUMBER}",
                body: """
Hello Suhas,

Your Jenkins pipeline FAILED!

Please check console logs:
${BUILD_URL}

Regards,
Jenkins CI/CD
                """
            )
            echo "Build FAILED!"
        }
    }
}
