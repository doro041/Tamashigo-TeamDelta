import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>
        Welcome to Tamashigo, our gamified task management tool for university students. Please read these terms and conditions carefully before using the application, as they control your use of the application. By accessing or using the application, you accept these terms.
      </Text>
      <Text style={styles.subtitle}>1. App Description</Text>
      <Text style={styles.text}>
        Our gamified to-do list software is aimed at helping users manage their daily duties and workload in a fun and engaging manner. The application employs game features such as coins, incentives, and accomplishments to encourage users to finish their tasks.
      </Text>
      <Text style={styles.subtitle}>2. User Registration</Text>
      <Text style={styles.text}>
        To use our application, you must create an account with us. You will be required to provide your name and email address throughout the registration process. You agree to submit correct and full information and to update it as required.
      </Text>
      <Text style={styles.subtitle}>3. User Conduct</Text>
      <Text style={styles.text}>
        You agree to only use our app for legal purposes and in accordance with these conditions.
      </Text>
      <Text style={styles.text}>
        - To publish, post, or transmit any information that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libellous, invasive of another's privacy, or otherwise questionable;
      </Text>
      <Text style={styles.text}>
        - To impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;
      </Text>
      <Text style={styles.text}>
        - To interfere with or disrupt the app or servers or networks connected to the app, or to disobey any requirements, procedures, policies, or regulations of networks connected to the app;
      </Text>
      <Text style={styles.text}>
        - To collect or store personal data about other users without their express consent.
      </Text>
      <Text style={styles.subtitle}>4. App Ownership</Text>
      <Text style={styles.text}>
        Our app and all its content and elements, including but not limited to text, graphics, logos, photographs, and software, are protected by copyright, trademark, and other intellectual property laws. Without our prior written approval, you may not duplicate, alter, distribute, or display any component of the application.
      </Text>
      <Text style={styles.subtitle}>5. User Content</Text>
      <Text style={styles.text}>
        You may upload, publish, or send material such as task lists, notes, and comments to our application. By doing so, you give us the royalty-free, perpetual, irreversible right to use, adapt, publish, translate, develop works derived from such material in any medium.
      </Text>
      <Text style={styles.text}>
        You certify and guarantee that you own or have the required authorizations and rights to upload, publish, or transmit this material, and that it does not violate the rights of other parties.
      </Text>
      <Text style={styles.subtitle}>6. Disclaimer of Warranties</Text>
      <Text style={styles.text}>
      Our app is delivered "as is" and "as available" without any explicit or implied guarantees of any sort. We do not ensure that the app will be uninterrupted or error-free, that any faults in the app will be fixed, or that the app or server that hosts the app are free of viruses or other dangerous components.</Text>
        <Text style={styles.subtitle}>7. Limitation of Liability</Text>
        <Text style={styles.text}>
        We will not be responsible for any damages arising out of or in connection with your use of the application, including but not limited to direct, indirect, incidental, consequential, or punitive damages, to the maximum extent allowed by law.
        </Text>
        <Text style={styles.subtitle}>8. Indemnification</Text>
        <Text style={styles.text}>
        You agree to indemnify and hold us harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the app, your violation of these terms, or your violation of any rights of another party.
        </Text>
        <Text style={styles.subtitle}>9. App Changes</Text>
        <Text style={styles.text}>
        We reserve the right to modify or discontinue the app at any time without notice to you. We will not be liable to you or any third party should we exercise this right.
        </Text>
        <Text style={styles.subtitle}>10. App Termination</Text>
        <Text style={styles.text}>
        We may terminate your access to the app at any time without notice to you. If you wish to terminate your account, you may do so by contacting us at
        </Text>
        </View>
        
    );
  };



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  text : {
    fontSize: 16,
    marginBottom: 10,

  },
});

export default TermsAndConditions;
