import { router, useLocalSearchParams } from 'expo-router';
import { fontStyles } from '../../../fonts';
import { theme } from '../../../theme';
import FormButton from '../../components/form/formButton';
import { StyleSheet, Text, View } from 'react-native';

type DocumentType = 'passport' | 'license' | 'national_id';

export default function EligibilityCriteria() {
  const { documentType } = useLocalSearchParams<{ documentType: DocumentType}>();

  const criteria: Record<DocumentType, string[]> = {
    passport: [
      "Applicant must be at least 18 years old.",
      "Applicant must be a citizen.",
      "Applicant must have a valid existing passport and national ID for renewal.",
    ],
    national_id: [
      "Applicant must be at least 18 years old.",
      "Applicant must be a citizen.",
      "Applicant must have a valid existing national ID.",
    ],
    license: [
      "Applicant must be at least 18 years old.",
      "Applicant must be a citizen or resident.",
      "Applicant must have a valid existing national ID and driving license.",
    ],
  };
  const documentCriteria = criteria[documentType];

  return (
    <View style={styles.container}>
      <Text style={fontStyles.mainHeading}>Eligibility Criteria</Text>
      <View style={styles.criteriaContainer}>
        {documentCriteria.map((criteriaItem, index) => (
          <View style={styles.criteriaItem} key={index}>
            <Text>•</Text>
            <Text key={index} style={[fontStyles.body, {marginLeft: 10}]}>{criteriaItem}</Text>
          </View>
        ))}
      <FormButton title='Continue' handlePress={() => router.navigate(`/application/${documentType}`)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    paddingVertical: 56,
    paddingHorizontal: 18,
    gap: 48,
    alignItems: 'center',
  },
  criteriaContainer: {
    gap: 12,
    paddingHorizontal: 10,
  },
  criteriaItem: {
    flexDirection: 'row'
  }
});
