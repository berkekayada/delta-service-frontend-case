import { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Input, 
  InputGroup,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Collapse
} from 'reactstrap';

const FilterComponent = ({ onFilterApply }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  
  useEffect(() => {
    if (!advancedFilterOpen && searchTerm.length >= 2) {
      const timerId = setTimeout(() => {
        onFilterApply(searchTerm);
      }, 500);
      
      return () => {
        clearTimeout(timerId);
      };
    } else if (!advancedFilterOpen && searchTerm.length === 0 && searchTerm !== '') {
      onFilterApply('');
    }
  }, [searchTerm, onFilterApply, advancedFilterOpen]);

  const handleClear = () => {
    setSearchTerm('');
    setAdvancedFilters({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    onFilterApply('');
  };

  const handleAdvancedFilterSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    
    const filterObject = {
      firstName: advancedFilters.firstName.trim(),
      lastName: advancedFilters.lastName.trim(),
      email: advancedFilters.email.trim(),
      phone: advancedFilters.phone.trim()
    };
    
    
    const isPhoneSearch = filterObject.phone !== '' && 
      (Object.values(filterObject).filter(v => v !== '').length === 1 ||
       /^[0-9\s\-+]+$/.test(filterObject.phone));
    
    
    let queryParts = Object.values(filterObject).filter(value => value !== '');
    const combinedFilter = queryParts.join(' ');
    
    console.log('Applying advanced filter:', combinedFilter, 'Is phone search:', isPhoneSearch);
    
    
    if (isPhoneSearch) {
      console.log('Phone search details:', {
        original: filterObject.phone,
        normalized: filterObject.phone.replace(/[\s\-+]/g, ''),
      });
    }
    
    
    setSearchTerm(combinedFilter);
    
    
    onFilterApply(combinedFilter, { 
      isAdvanced: true, 
      fields: filterObject,
      isPhoneSearch
    });
  };

  const handleAdvancedFilterChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAdvancedFilter = () => {
    const newState = !advancedFilterOpen;
    setAdvancedFilterOpen(newState);
    
    if (!newState) {  
      
      setAdvancedFilters({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      });
      
      
      
      if (searchTerm) {
        onFilterApply(searchTerm);
      }
    } else {
      
      
      if (searchTerm) {
        const terms = searchTerm.split(' ');
        if (terms.length >= 1 && terms[0]) {
          setAdvancedFilters(prev => ({
            ...prev,
            firstName: terms[0] || ''
          }));
        }
        if (terms.length >= 2 && terms[1]) {
          setAdvancedFilters(prev => ({
            ...prev,
            lastName: terms[1] || ''
          }));
        }
      }
    }
  };

  return (
    <Card className="mb-3">
      <CardBody>
        <form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search users by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onFilterApply(searchTerm);
                    }
                  }}
                />
                <Button 
                  type="button"
                  color="primary" 
                  onClick={(e) => {
                    e.preventDefault();
                    onFilterApply(searchTerm);
                  }}
                >
                  Search
                </Button>
                {searchTerm && (
                  <Button 
                    type="button"
                    color="secondary" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleClear();
                    }}
                  >
                    Clear
                  </Button>
                )}
              </InputGroup>
              <div className="mt-2 d-flex justify-content-end">
                <Button 
                  type="button"
                  color="link" 
                  size="sm" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleAdvancedFilter();
                  }}
                  className="p-0"
                >
                  {advancedFilterOpen ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                </Button>
              </div>
            </Col>
          </Row>

          <Collapse isOpen={advancedFilterOpen}>
      <h6 className='mt-4'>Advanced Filters</h6>
      <div>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="firstName" className="text-start d-block">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Filter by first name"
                value={advancedFilters.firstName}
                onChange={handleAdvancedFilterChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName" className="text-start d-block">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Filter by last name"
                value={advancedFilters.lastName}
                onChange={handleAdvancedFilterChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="email" className="text-start d-block">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Filter by email"
                value={advancedFilters.email}
                onChange={handleAdvancedFilterChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="phone" className="text-start d-block">Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="Filter by phone (e.g. 431, 965)"
                value={advancedFilters.phone}
                onChange={handleAdvancedFilterChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && advancedFilters.phone.trim()) {
                    e.preventDefault();
                    handleAdvancedFilterSubmit(e);
                  }
                }}
              />
              <small className="form-text text-muted">
                Telefon numaraları "+81 965-431-3024" formatındadır. Aramak istediğiniz rakamları (örn: 965 veya 431) giriniz. "+", "-" veya boşluk girmeden sadece rakam girilmesi önerilir.
              </small>
            </FormGroup>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button 
            type="button" 
            color="primary" 
            size="sm" 
            onClick={(e) => {
              e.preventDefault();
              handleAdvancedFilterSubmit(e);
            }}
          >
            Apply Filters
          </Button>
        </div>
      </div>
</Collapse>

        </form>
      </CardBody>
    </Card>
  );
};

export default FilterComponent;
